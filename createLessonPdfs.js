const { spawn } = require('child_process');
const nodeCleanup = require('node-cleanup');
const puppeteer = require('puppeteer');

let localWebServer = null;
const cleanup = () => {
  if (!localWebServer.killed) {
    console.log('Killing localWebServer');
    localWebServer.kill('SIGINT'); // Ctrl-C
    localWebServer.stdout.removeAllListeners();
    localWebServer.stderr.removeAllListeners();
    localWebServer.removeAllListeners();
  }
};
nodeCleanup(function (exitCode, signal) {
  console.log('Exiting node script... (exitCode:' + exitCode + ', signal:' + signal + ')');
  cleanup();
});

const doConvert = () => {
  const urlBase = 'http://127.0.0.1:8080';

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = urlBase + '/scratch/astrokatt/astrokatt?pdf';
    await page.goto(url, { waitUntil: 'networkidle' });
    //await page.emulateMedia('screen');
    console.log('Rendering PDF: ' + url);
    await page.pdf({path: 'astrokatt.pdf', format: 'A4'});

    browser.close();
    cleanup();
    console.log('Node will exit in 3 seconds...');
    setTimeout(() => { process.exit(); }, 3000);
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

//localWebServer.on('close', (code, signal) => {console.log('close: code=' + code + ', signal=' + signal)});
//localWebServer.on('exit', (code, signal) => {console.log('exit: code=' + code + ', signal=' + signal)});
localWebServer.on('error', (err) => {console.log('error:', err)});
