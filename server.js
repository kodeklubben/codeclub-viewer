/* eslint-env node */

var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();
app.use(compression());

const builddir = 'dist';

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, builddir)));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, builddir, 'index.html'));
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});
