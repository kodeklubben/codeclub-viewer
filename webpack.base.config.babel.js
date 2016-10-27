/**
 *  The webpack base config file
 *  ------------------------------
 *
 *  Use this file as a base for other config files, with e.g.
 *  import baseConfig from './webpack.base.config.babel.js'
 *
 */

////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////
/* eslint-env node */


//////////////////////
// IMPORT / REQUIRE //
//////////////////////
const webpack = require('webpack');
import path from 'path';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';
import highlight from './src/highlighting.js';
const fs = require('fs');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

///////////////
// CONSTANTS //
///////////////

// Use 'subDir' to serve the site from a subdir, e.g. subDir='beta' for http://kodeklubben.github.io/beta
// The value of subDir is read from the file 'url-path-prefix.config' in the root folder, if it exists.
const subDirFile = './url-path-prefix.config';
var subDir = fs.existsSync(subDirFile) ? fs.readFileSync(subDirFile, 'utf8').trim() : '';
if (subDir.startsWith('/')) { subDir = subDir.slice(1); }
if (subDir.endsWith('/')) { subDir = subDir.slice(0, -1); }

export const buildDir = path.join('dist', subDir);
// Webpack needs final slash in publicPath to rewrite relative paths correctly
const publicPathWithoutSlash = path.join('/', subDir);
export const publicPath = publicPathWithoutSlash + (subDir ? '/' : '');
export const lessonSrc = '../oppgaver/src';

// Loaders for lesson files written in markdown (.md)
const frontmatterLoaders = ['json', 'front-matter?onlyAttributes'];
const contentLoaders = ['html', 'markdown-it', 'front-matter?onlyBody'];

const cssModuleLoaderStr = 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

/////////////////////
// Helper function //
/////////////////////
export function getValuesAsArray(obj) {
  return Object.keys(obj).map(k => obj[k]);
}

//////////////////////////
// Loaders as an object //
//////////////////////////

// Convert to array before using in config.module.loaders, e.g. using getValues()
// Keeping it in an object with keys, so that parts of it can easily be changed.
export function getLoaders() {
  return {
    js: {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    css: {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: ['isomorphic-style', cssModuleLoaderStr, 'postcss']
    },
    scss: {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['isomorphic-style', cssModuleLoaderStr, 'postcss', 'sass']
    },
    image: {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=5000&name=[path][name].[hash:6].[ext]'
    },
    fonturl: {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000'
    },
    fontfile: {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      loader: 'file'
    },
    json: {
      // This loader is needed for some packages, e.g. sanitize-html (and markdown-it?)
      test: /\.json$/,
      loader: 'json'
    }
  };
}

/////////////////////
// THE BASE CONFIG //
/////////////////////

const baseConfig = {
  module: {
    noParse: /node_modules\/scratchblocks\/browser\/scratchblocks\.(min\.)?js/,
    loaders: getValuesAsArray(getLoaders())
  },
  output: {
    path: path.resolve(__dirname, buildDir),
    publicPath: publicPath
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      lessonSrc: path.resolve(__dirname, lessonSrc)
    }
  },
  resolveLoader: {
    root: [path.resolve(__dirname, 'node_modules')],
    alias: {
      // Markdown-files are parsed only through one of these three aliases, and are
      // not parsed automatically by adding a loader with test /\.md$/ for two reasons:
      // 1) We don't want to use '!!' in the requires in the modules, and
      // 2) Since the lessons create a lot of data, we want to be sure that we only load
      //    what we need by being explicit in the requires, e.g. require('onlyFrontmatter!./file.md')
      //    It is even more important when using in require.context('onlyFrontmatter!./path', ....)
      'onlyFrontmatter': 'combine?' + JSON.stringify({frontmatter: frontmatterLoaders}),
      'onlyContent': 'combine?' + JSON.stringify({content: contentLoaders}),
      'frontAndContent': 'combine?' + JSON.stringify({
        frontmatter: frontmatterLoaders,
        content: contentLoaders
      })
    }
  },
  'markdown-it': {
    preset: 'commonmark',
    //typographer: true,
    use: [
      MarkdownItAnchor,
      MarkdownItAttrs,
      MarkdownItHeaderSections,
      MarkdownItImplicitFigures
    ],
    highlight
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'PUBLICPATH_WITHOUT_SLASH': JSON.stringify(publicPathWithoutSlash)
      }
    }),
    new FaviconsWebpackPlugin('./src/assets/graphics/favicon.png')
  ]
};

export default baseConfig;
