const { spawn } = require('child_process');
const nodeCleanup = require('node-cleanup');
const puppeteer = require('puppeteer');
const path = require('path');
const fse = require('fs-extra');

const {lessonPaths} = require('./pathlists');

const urlBase = 'http://127.0.0.1:8080';

let localWebServer = null;
const cleanup = () => {
  if (!localWebServer.killed) {
    console.log('Killing localWebServer');
    const killSignal = 'SIGTERM'; // 'SIGINT';
    const killSuccess = localWebServer.kill(killSignal);
    console.log('Successfully killed localWebServer with ' + killSignal + ':', killSuccess);
    localWebServer.stdout.removeAllListeners();
    localWebServer.stderr.removeAllListeners();
    localWebServer.removeAllListeners();
  }
};
nodeCleanup(function (exitCode, signal) {
  console.log('Exiting node script... (exitCode:' + exitCode + ', signal:' + signal + ')');
  cleanup();
});

const convertUrl = async (browser, lesson) => {
  try {
    const pdfFile = path.join('./dist', lesson + '.pdf');
    const pdfFolder = path.dirname(pdfFile);
    fse.mkdirsSync(pdfFolder);
    const page = await browser.newPage();
    const url = urlBase + lesson + '?pdf';
    await page.goto(url, {waitUntil: 'networkidle'});
    //await page.emulateMedia('screen');
    console.log('Rendering PDF: ' + url + ' ---> ' + pdfFile);
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
  } catch(err) {
    console.log(err);
  }
};

const doConvert = () => {
  const lessons = lessonPaths({verbose: false}).map(path => '/' + path.replace(/\/$/, ''));

  (async () => {
    const browser = await puppeteer.launch();

    // Could perhaps look into Promise.race() to run several promises simultaneously
    for (const path of lessons) {
      await convertUrl(browser, path);
    }

    browser.close();
    cleanup();
  })();

};

localWebServer = spawn('yarn serve', {
  shell: true
});

const checkStarted = (data) => {
  const str = String(data);
  console.log('localWebServer:', str);
  if (/^Serving at (.*?),/.test(str)) {
    doConvert(localWebServer);
  }
};

localWebServer.stdout.on('data', checkStarted);
localWebServer.stderr.on('data', checkStarted);

localWebServer.on('close', (code, signal) => {console.log('close: code=' + code + ', signal=' + signal)});
localWebServer.on('exit', (code, signal) => {console.log('exit: code=' + code + ', signal=' + signal)});
localWebServer.on('error', (err) => {console.log('error:', err)});
