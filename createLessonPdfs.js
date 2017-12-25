/* eslint-env node */

const { spawn, execSync } = require('child_process');
const nodeCleanup = require('node-cleanup');
const puppeteer = require('puppeteer');
const path = require('path');
const fse = require('fs-extra');
const {buildDir, publicPath} = require('./buildconstants');
const {lessonPaths} = require('./pathlists');

const urlBase = 'http://127.0.0.1:8080' + publicPath;
let localWebServer = null;

const cleanup = () => {
  if (localWebServer && !localWebServer.killed) {
    console.log('Killing localWebServer');
    const killSignal = 'SIGTERM'; // 'SIGINT';
    const killSuccess = localWebServer.kill(killSignal);
    console.log('Successfully killed localWebServer with ' + killSignal + ':', killSuccess);
    localWebServer.stdout.removeAllListeners();
    localWebServer.stderr.removeAllListeners();
    localWebServer.removeAllListeners();
  }
};

const convertUrl = async (browser, lesson) => {
  const pdfFile = path.join(buildDir, lesson + '.pdf');
  const pdfFolder = path.dirname(pdfFile);
  fse.mkdirsSync(pdfFolder);
  const page = await browser.newPage();
  const url = urlBase + lesson + '?pdf';
  await page.goto(url, {waitUntil: 'networkidle'});
  //await page.emulateMedia('screen');
  console.log('Rendering PDF: ' + url + ' ---> ' + path.relative(__dirname, pdfFile));
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
};

const doConvert = () => {
  const lessons = lessonPaths().slice(0,10);

  (async () => {
    try {
      const browser = await puppeteer.launch();

      // Could perhaps look into Promise.race() to run several promises simultaneously
      for (const path of lessons) {
        try {
          await convertUrl(browser, path);
        } catch(err) {
          console.log('Error while converting URLs. Skipping rest of lessons.');
          console.log(err);
          break;
        }
      }

      browser.close();
    }
    catch (e) {
      console.log('Error in doConvert:', e);
    }
    finally {
      cleanup();
    }
  })();

};

const checkStarted = (data) => {
  const str = String(data);
  console.log('localWebServer:', str);
  if (/^Serving at (.*?),/.test(str)) {
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

localWebServer = spawn('yarn serve', {
  shell: true
});

localWebServer.stdout.on('data', checkStarted);
localWebServer.stderr.on('data', checkStarted);

localWebServer.on('close', (code, signal) => { console.log('close: code=' + code + ', signal=' + signal); });
localWebServer.on('exit', (code, signal) => { console.log('exit: code=' + code + ', signal=' + signal); });
localWebServer.on('error', (err) => { console.log('error:', err); });
