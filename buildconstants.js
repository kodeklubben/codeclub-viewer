/* eslint-env node */
const path = require('path');
const fs = require('fs');

// Use 'subDir' to serve the site from a subdir, e.g. subDir='beta' for http://kodeklubben.github.io/beta
// The value of subDir is read from the file 'url-path-prefix.config' in the root folder, if it exists.
const subDirFile = './url-path-prefix.config';
let subDir = fs.existsSync(subDirFile) ? fs.readFileSync(subDirFile, 'utf8').trim() : '';
if (subDir.startsWith('/')) { subDir = subDir.slice(1); }
if (subDir.endsWith('/')) { subDir = subDir.slice(0, -1); }

const buildBaseDir = path.join(__dirname, 'dist');
const buildDir = path.join(buildBaseDir, subDir);
const isHot = process.argv.indexOf('--hot') >= 0;

// Webpack needs final slash in publicPath to rewrite relative paths correctly
const publicPathWithoutSlash = '/' + subDir;
const publicPath = '/' + subDir + (subDir ? '/' : '');
const lessonSrc = path.resolve(__dirname, '../oppgaver/src');
const lessonFiltertags = path.resolve(__dirname, '../oppgaver/filtertags');
const assets = path.resolve(__dirname, './src/assets');
const bootstrapStyles = path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/bootstrap');

const filenameBase = isHot ? '[name]' : '[name].[chunkhash:6]';

module.exports = {
  buildBaseDir,
  buildDir,
  isHot,
  publicPathWithoutSlash,
  publicPath,
  lessonSrc,
  lessonFiltertags,
  assets,
  bootstrapStyles,
  filenameBase,
};
