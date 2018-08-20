/* eslint-env node */

const { spawn, execSync } = require('child_process');
const nodeCleanup = require('node-cleanup');
const puppeteer = require('puppeteer');
const path = require('path');
const fse = require('fs-extra');
const {buildDir, publicPath} = require('./buildconstants');
const {lessonPaths} = require('./pathlists');
const PQueue = require('p-queue');

const isWin = process.platform === 'win32';
const isTravis = 'TRAVIS' in process.env && 'CI' in process.env;
const concurrentPDFrenders = isTravis ? 4 : 8;
const maxRetriesPerPDF = 3;
const urlBase = 'http://127.0.0.1:8080' + publicPath;
let localWebServer = null;
const puppeteerArgs = [];
if (isTravis) {
  puppeteerArgs.push('--no-sandbox');             // needed for travis to work
  puppeteerArgs.push('--disable-dev-shm-usage');  // to minimize page crashes in (especially) linux/docker
}

console.log('concurrentPDFrenders:', concurrentPDFrenders);
console.log('maxRetriesPerPDF:', maxRetriesPerPDF);
console.log('urlBase:', urlBase);
console.log('isWin:', isWin);
console.log('isTravis:', isTravis);
console.log('Puppeteer args:', puppeteerArgs);

const cleanup = () => {
  if (localWebServer && !localWebServer.killed) {
    console.log('Killing localWebServer, PID:', localWebServer.pid);

    if (isWin) {
      spawn('taskkill', ['/pid', localWebServer.pid, '/f', '/t']);
    } else {
      process.kill(-localWebServer.pid);
    }

    localWebServer.killed = true;
    console.log('Killed localWebServer');
    localWebServer.stdout.removeAllListeners();
    localWebServer.stderr.removeAllListeners();
    localWebServer.removeAllListeners();
  }
};

const idlePages = [];

const convertUrl = async (browser, lesson) => {
  const pdfFile = path.join(buildDir, lesson + '.pdf');
  const pdfFolder = path.dirname(pdfFile);
  fse.mkdirsSync(pdfFolder);
  let page;
  if (idlePages.length > 0) {
    page = idlePages.pop();
  } else {
    page = await browser.newPage();
    page.on('error', (err) => {
      console.log('Puppeteer error --- page crashed:', err);
    });
    page.on('pageerror', (err) => {
      console.log('Puppeteer pageerror --- uncaught exception in page:', err);
      process.exit(1);
    });
  }
  const url = urlBase + lesson + '?pdf';
  //page.setJavaScriptEnabled(false);
  console.log('Rendering PDF:', url, '--->', path.relative(__dirname, pdfFile));
  await page.goto(url, {waitUntil: 'networkidle0'});
  //await page.emulateMedia('screen');
  await page.pdf({
    path: pdfFile,
    printBackground: true,
    format: 'A4',
    margin: {
      top: '0.5in',
      bottom: '0.5in',
      left: '0.5in',
      right: '0.5in',
    }
  });
  idlePages.push(page);
};

const doConvert = () => {
  const lessons = lessonPaths();
  let success = true;

  (async () => {
    try {
      const browser = await puppeteer.launch({args: puppeteerArgs});
      const queue = new PQueue({concurrency: concurrentPDFrenders});

      let completedPDFs = 0;
      const retriesForPath = {};
      const failedPDFs = [];

      const onSuccess = () => {
        ++completedPDFs;
      };

      const onFail = (path, reason) => {
        const retries = retriesForPath[path] || 0;
        console.log(`---> Failed to create PDF of the lesson ${path} (earlier retries: ${retries}).`);
        console.log(`---> Reason: ${reason}.`);
        if (retries < maxRetriesPerPDF) {
          console.log('---> Re-adding it to queue to try again.');
          retriesForPath[path] = retries + 1;
          queue.add(() => convertUrl(browser, path))
            .then(onSuccess)
            .catch(reason => onFail(path, reason));
        } else {
          delete retriesForPath[path];
          failedPDFs.push(path);
          console.log('---> Failed too many times, GIVING UP.');
        }
      };

      const startTime = new Date().getTime();

      for (const path of lessons) {
        queue.add(() => convertUrl(browser, path))
          .then(onSuccess)
          .catch(reason => onFail(path, reason));
      }

      await queue.onIdle();
      const endTime = new Date().getTime();
      const seconds = (endTime - startTime)/1000.0;

      console.log('Total number of lessons:', lessons.length);
      console.log('Number of successful PDFs:', completedPDFs);
      console.log('Time used to convert PDFs:', seconds, 'seconds = ',
        (seconds/completedPDFs).toFixed(2), 'seconds/PDF');

      if (Object.keys(retriesForPath).length > 0) {
        console.log('Successful retries:');
        Object.keys(retriesForPath).forEach(path => {
          const retries = retriesForPath[path];
          console.log(`   ${path} (${retries} retries)`);
        });
      }

      if (failedPDFs.length > 0) {
        success = false;
        console.log('Failed PDFs:');
        failedPDFs.forEach(path => { console.log(`   ${path}`); });
      }

      browser.close();
    }
    catch (e) {
      console.log('Error in doConvert:', e);
      success = false;
    }
    finally {
      cleanup();
      if (!success) {
        console.log('ERROR: Failed to convert PDFs.');
        process.exit(1);
      }
    }
  })();
};

const checkStarted = (data) => {
  const str = String(data).trim();
  console.log('localWebServer:', str);
  if (/^Express server running at/.test(str)) {
    doConvert(localWebServer);
  }
};

const checkYarnVersion = () => {
  const version = execSync('yarn --version', {shell: true}).toString().trim();
  const lowestVersion = '1.3.2';
  const [major = 0, minor = 0, patch = 0] = version.split('.');
  const [lowestMajor = 0, lowestMinor = 0, lowestPatch = 0] = lowestVersion.split('.');
  const tooLow = () => {
    console.log('ERROR: The version of yarn (' + version + ') is too low. Must be >= ' + lowestVersion);
    process.exit(1);
  };
  if (major < lowestMajor) { tooLow(); }
  if (major === lowestMajor && minor < lowestMinor) { tooLow(); }
  if (major === lowestMajor && minor === lowestMinor && patch < lowestPatch) { tooLow(); }
};

checkYarnVersion();

nodeCleanup(function (exitCode, signal) {
  console.log('Exiting node script... (exitCode:' + exitCode + ', signal:' + signal + ')');
  cleanup();
});

localWebServer = spawn('yarn', ['serve'], {detached: true});

localWebServer.stdout.on('data', checkStarted);
localWebServer.stderr.on('data', checkStarted);

localWebServer.on('close', (code, signal) => { console.log('close: code=' + code + ', signal=' + signal); });
localWebServer.on('exit', (code, signal) => { console.log('exit: code=' + code + ', signal=' + signal); });
localWebServer.on('error', (err) => { console.log('error:', err); });
