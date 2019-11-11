/* eslint-env node */
const path = require('path');

const buildDir = path.join(__dirname, 'dist');
const isHot = process.argv.indexOf('--hot') >= 0;

const publicPath = '/';
const lessonRepo = path.resolve(__dirname, '../oppgaver');
const lessonSrc = path.resolve(lessonRepo, 'src');
const lessonFiltertags = path.resolve(__dirname, '../oppgaver/filtertags');
const assets = path.resolve(__dirname, './src/assets');

const filenameBase = isHot ? '[name]' : '[name].[chunkhash:6]';

module.exports = {
  buildDir,
  isHot,
  publicPath,
  lessonRepo,
  lessonSrc,
  lessonFiltertags,
  assets,
  filenameBase,
};
