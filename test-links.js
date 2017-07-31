/* eslint-env node */

/**
 * Copyright © 2017 Arve Seljebu, The MIT License
 */
const assert = require('assert');
const http = require('http');
const packageFile = require('./package.json');
const Spider = require('node-spider');
const Static = require('node-static');

/**
 * Get number of keys in object.
 * @param {object} obj
 */
function length (obj) {
  let size = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

const PORT = 3000;
const start = 'http://localhost:' + PORT;
const buildRoot = 'dist';
const repo = packageFile.repository.url.replace('git+', '').replace('.git', '');

/**
* test-links.js crawls all pages and check that href and src attributes does
* have a HTTP 200 response. It checks links outside the start domain, but
* does _not_ crawl pages outside start.
*/
console.log('Checking all links found at ' + start);
let webserver;

if (start.search('http://localhost') === 0) {
  // we need to start a web server
  const files = new Static.Server(buildRoot);
  webserver = http.createServer(function (request, response) {
    request.addListener('end', function () {
      files.serve(request, response);
    }).resume();
  });
  webserver.listen(PORT, crawl);
} else {
  crawl();
}

function crawl () {
  const resources = {};  // dict of referrers {link: [referrer1, referrer2, ..], link2..}
  resources[start] = ['start'];
  const failed = [];  // list of failed links
  const retries = [];
  let ok = 0;  // number of OK links
  let broken = 0;  // number of broken links

  const opts = {
    concurrent: 5,
    done: done,
    error: error,
    headers: { 'user-agent': 'codeclub_lesson_builder' },
    timeout: 10000
  };  // spider options

  // text spider for HTML, CSS, etc
  const textSpider = new Spider(opts);

  // HEAD requests on external sites and binary files
  const headOpts = Object.assign({}, opts);
  headOpts.method = 'HEAD';
  const headSpider = new Spider(headOpts);

  // start crawling
  textSpider.queue(start, parseResponse);

  /**
   * on OK link
   */
  function parseResponse (doc) {
    // check status code
    const code = doc.res.statusCode;
    if (code !== 200 && this.opts.method === 'HEAD') {
      // try again with GET-method
      textSpider.queue(this.opts.url, parseResponse);
      return;
    }
    if (code !== 200) {
      process.stdout.write('x'); // give some feedback
      broken += 1;
      failed.push({u: doc.url, c: code});
      return;
    } else {
      ok += 1;
      process.stdout.write('.'); // give some feedback
    }

    // do not parse binary files
    if (!/text|css|json|xml/i.test(doc.res.headers['content-type'])) {
      return;
    }

    // only crawl links below start (not other domains)
    if (doc.url.search(start) === 0) {
      // all elements with href set
      doc.$('*[href]').each(queueUrl('href'));

      // all elements with src set
      doc.$('*[src]').each(queueUrl('src'));
    }

    /**
     * queueUrl closure
     */
    function queueUrl (type) {
      return function () {
        const href = doc.$(this).attr(type);
        // do not add data:image/png;base64 links
        if (href.search(/^data:image\/(png|gif|jpeg);base64/) === 0) {
          return;
        }
        // do not add mailto and javascript links
        if (href.search(/^(mailto|javascript)/) === 0) {
          return;
        }
        // do not add link to lesson source code
        if (href.search(repo + '/tree/master/') === 0) {
          return;
        }
        // do not add "github new issue" links
        if (href.search(/^https:\/\/github.com\/.*?\/issues\/new/) === 0) {
          return;
        }
        // do not add localhost links that doesn't have `start` as root
        if (href.search('http://localhost:') === 0 &&
            href.search(start) !== 0) {
          return;
        }
        // do not check #-link explicit
        const url = doc.resolve(href).split('#')[0];
        // do not check local PDFs if env.BUILD_PDF is 'false'
        if (process.env.BUILD_PDF === 'false' &&
            url.search(/\.pdf$/) !== -1 &&
            doc.url.search(url.slice(0, -4)) === 0) {
          return;
        }
        // already added
        if (url in resources) {
          // add referrer
          resources[url].push(doc.url);
          return;
        }
        queue(url);
        // store referrer
        resources[url] = [doc.url];
      };
    }
  }

  function queue (url) {
    // remove earlier entries
    if (textSpider.visited[url]) {
      textSpider.visited[url] = false;
    }
    if (headSpider.visited[url]) {
      headSpider.visited[url] = false;
    }
    // external sites or binaries
    if (url.search(start) !== 0 ||
        url.search(/\.(jpg|png|gif|zip)$/) === 0) {
      headSpider.queue(url, parseResponse);
    } else {  // text, e.g., HTML, CSS, etc
      textSpider.queue(url, parseResponse);
    }
  }

  /**
   * on broken link
   */
  function error (err, url) {
    if (err.code === 'ETIMEDOUT' && retries.indexOf(url) === -1) {
      // retry timeouts once
      process.stdout.write('r');
      retries.push(url);
      queue(url);
    } else {
      process.stdout.write('t'); // give some feedback
      broken += 1;
      failed.push({u: url, c: err.code});
    }
  }

  /**
   * print results and exit
   */
  function done () {
    // wait until both spiders are done
    if (textSpider.active.length !== 0 || headSpider.active.length !== 0) {
      return;
    }

    console.log('\nLink check done');
    console.log('---------------');
    console.log('Links OK:', ok);
    console.log('Links broken:', broken);
    console.log('---------------');

    failed.forEach(function (fail) {
      console.log('Code', fail.c, 'for', fail.u, 'in');
      resources[fail.u].forEach(function (ref) {
        console.log(' -', ref);
      });
    });

    assert.equal(ok + broken, length(resources));

    if (webserver) {
      webserver.close();
    }

    if (broken !== 0) {
      // avoid error trace
      process.exit(1);
    } else {
      // everything ok, exit with no error code
      process.exit(0);
    }
  }
} // crawl end
