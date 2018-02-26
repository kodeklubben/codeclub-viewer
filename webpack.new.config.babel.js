////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////
/* eslint-env node */

import {
  buildDir, isHot, publicPath, publicPathWithoutSlash, filenameBase, isProduction,
  buildPDF, lessonSrc,
} from './buildconstants';
import path from 'path';

// console.log('Build constants:');
// console.log('  buildDir:', buildDir);
// console.log('  publicPath:', publicPath);
// console.log('  publicPathWithoutSlash:', publicPathWithoutSlash);
// console.log('  isHot:', isHot);
// console.log('  isProduction:', isProduction);
// console.log('  buildPDF:', buildPDF);
// console.log('  filenameBase:', filenameBase);
// console.log();


const cssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: '',
    importLoaders: 1,
    localIdentName: '[name]__[local]__[hash:base64:5]',
  },
};

// All RegExps that involve paths must have the path parts surrounded by regexpCompPath
const regexpCompPath = (str) => path.normalize(str).replace(/\\/g, '\\\\');
const inCurrentRepo = (extRegexp) => new RegExp('^' + regexpCompPath(__dirname) + '.*\\.' + extRegexp + '$');

const config = {
  entry: {
    main: ['./src/index.js', 'bootstrap-loader'],
    staticbundle: './src/index-static.js',
  },
  output: {
    path: buildDir,
    publicPath: isHot ? publicPathWithoutSlash : publicPath,
    filename: `${filenameBase}.js`,
    chunkFilename: `${filenameBase}.js`,

    // static-site-generator must have files compiled to UMD or CommonJS
    // so they can be required in a Node context:
    libraryTarget: 'umd',
  },
  modules: {
    rules: [
      {
        test: inCurrentRepo('js'),
        exclude: /node_modules/,
        use: isHot ? [
          'react-hot-loader',
          'babel-loader',
        ] : [
          'babel-loader',
        ],
      },
      {
        test: inCurrentRepo('css'),
        exclude: /node_modules/,
        use: [
          'isomorphic-style-loader',
          cssModuleLoader,
          'postcss-loader'
        ],
      },
      {
        test: inCurrentRepo('scss'),
        exclude: /node_modules/,
        use: [
          'isomorphic-style-loader',
          cssModuleLoader,
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: inCurrentRepo('(png|jpg|jpeg|gif)'),
        loader: 'file-loader',
        options: {name: 'CCV-assets/[name].[hash:6].[ext]'},
      },
      {
        test: inCurrentRepo('woff2?(\\?v=[0-9]\\.[0-9]\\.[0-9])?'),
        loader: 'file-loader',
        options: { name: 'CCV-assets/[name].[hash:6].[ext]'},
      },
      {
        test: inCurrentRepo('(ttf|eot|svg)(\\?[\\s\\S]+)?'),
        loader: 'file-loader',
        options: {name: 'CCV-assets/[name].[hash:6].[ext]'},
      },
      {
        test: (absPath) => absPath.startsWith(lessonSrc), // only in lesson repo
        exclude: [/\.md$/, new RegExp(regexpCompPath('/playlists/') + '.*\\.txt$')],
        loader: 'file-loader',
        options: {name: '[path][name].[hash:6].[ext]&context=' + lessonSrc},
      },
    ],
  },
};

export default config;
