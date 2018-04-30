/* eslint-env node */

// The main purpose of this express server is to simulate github's behavior as closely as possible.

const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
app.use(compression());

const builddir = 'dist';

// serve our static stuff (i.e. urls that match files that exists)
app.use(express.static(path.resolve(builddir), {redirect: false}));

// send all requests other requests here
app.get('*', function (req, res) {
  let filepath = path.resolve(builddir, req.params[0].slice(1)); // Remove leading slash
  if (filepath.endsWith('/')) { filepath = filepath.slice(0, -1); } // Remove trailing slash if it exists
  if (/^(.*[/][^.]+)$/.test(filepath)) { // if urlpath has no extension...
    filepath = filepath + '.html';  // ... add .html extension
  }
  if (!fs.existsSync(filepath)) { // if file doesn't exist, send to 404.html
    filepath = path.resolve(builddir, '404.html');
  }
  res.sendFile(filepath); // Otherwise serve file
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT);
});
