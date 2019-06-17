/* eslint-env node */

// The main purpose of this express server is to simulate github's behavior as closely as possible.

const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const { buildBaseDir, buildDir, publicPathWithoutSlash } = require('./buildconstants');

// All RegExps that involve paths must have the path parts surrounded by regexpCompPath
const regexpCompPath = (str) => path.normalize(str).replace(/\\/g, '\\\\');
const slash = regexpCompPath('/');

const app = express();
app.use(compression());

// serve our static stuff (i.e. urls that match files that exists)
app.use(publicPathWithoutSlash, express.static(path.normalize(buildDir), {redirect: false}));

// send all requests other requests here
app.get('*', function (req, res) {
  let url = req.params[0];
  if (!url.startsWith(publicPathWithoutSlash)) {
    console.log('Redirecting to', publicPathWithoutSlash);
    res.redirect(publicPathWithoutSlash);
  } else {
    let filepath;
    if (url === publicPathWithoutSlash || url === publicPathWithoutSlash + '/') {
      filepath = path.join(buildDir, 'index.html');
    } else {
      if (url.endsWith('/')) {
        url = url.slice(0, -1);
      }
      filepath = path.join(buildBaseDir, url);
      if (new RegExp(`^(.*${slash}[^.${slash}]+)$`).test(filepath)) { // if urlpath has no extension...
        filepath = filepath + '.html';  // ... add .html extension
      }
      if (!fs.existsSync(filepath)) { // if file doesn't exist, send to 404.html
        console.log('Could not find file at path', filepath);
        filepath = path.join(buildDir, '404.html');
      }
    }
    res.sendFile(filepath); // Otherwise serve file
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT);
});
