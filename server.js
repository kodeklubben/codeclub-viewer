/* eslint-env node */

const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression());

const builddir = 'dist';

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, builddir)));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, builddir, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});
