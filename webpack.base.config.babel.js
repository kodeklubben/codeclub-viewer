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
import MarkdownItTaskCheckbox from 'markdown-it-task-checkbox';
import highlight from './src/highlighting.js';
const fs = require('fs');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

///////////////
// CONSTANTS //
///////////////

// Use 'subDir' to serve the site from a subdir, e.g. subDir='beta' for http://kodeklubben.github.io/beta
// The value of subDir is read from the file 'url-path-prefix.config' in the root folder, if it exists.
const subDirFile = './url-path-prefix.config';
let subDir = fs.existsSync(subDirFile) ? fs.readFileSync(subDirFile, 'utf8').trim() : '';
if (subDir.startsWith('/')) { subDir = subDir.slice(1); }
if (subDir.endsWith('/')) { subDir = subDir.slice(0, -1); }

export const buildDir = path.join('dist', subDir);
const absBuildDir = path.join(__dirname, buildDir);
// Webpack needs final slash in publicPath to rewrite relative paths correctly
const publicPathWithoutSlash = '/' + subDir;
export const publicPath = publicPathWithoutSlash + (subDir ? '/' : '');
export const lessonSrc = path.resolve(__dirname, '../oppgaver/src');
const assets = path.resolve(__dirname, './src/assets');
const bootstrapStyles = path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/bootstrap');

// Loaders for lesson files written in markdown (.md)
const frontmatterLoaders = [
  'json-loader',
  'front-matter-loader?onlyAttributes'
];
const contentLoaders = [
  'html-loader?attrs=false',
  'markdown-it-loader',
  'front-matter-loader?onlyBody'
];

const cssModuleLoaderStr = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

/////////////////////
// Helper function //
/////////////////////
export function getValuesAsArray(obj) {
  return Object.keys(obj).map(k => obj[k]);
}

const inCurrentRepo = (extRegexp) => new RegExp('^' + __dirname + '.*\\.' + extRegexp + '$');

//////////////////////////
// Loaders as an object //
//////////////////////////

// Convert to array before using in config.module.loaders, e.g. using getValues()
// Keeping it in an object with keys, so that parts of it can easily be changed.
export function getLoaders() {
  return {
    js: {
      test: inCurrentRepo('js'),
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    css: {
      test: inCurrentRepo('css'),
      exclude: /node_modules/,
      loaders: ['isomorphic-style-loader', cssModuleLoaderStr, 'postcss-loader']
    },
    scss: {
      test: inCurrentRepo('scss'),
      exclude: /node_modules/,
      loaders: ['isomorphic-style-loader', cssModuleLoaderStr, 'postcss-loader', 'sass-loader']
    },
    image: {
      test: inCurrentRepo('(png|jpg|jpeg|gif)'),
      loader: 'file-loader?name=CCV-assets/[name].[hash:6].[ext]',
    },
    fonturl: {
      test: inCurrentRepo('woff2?(\\?v=[0-9]\\.[0-9]\\.[0-9])?'),
      loader: 'file-loader?name=CCV-assets/[name].[hash:6].[ext]',
    },
    fontfile: {
      test: inCurrentRepo('(ttf|eot|svg)(\\?[\\s\\S]+)?'),
      loader: 'file-loader?name=CCV-assets/[name].[hash:6].[ext]',
    },
    json: {
      // This loader is needed for some packages, e.g. sanitize-html (and markdown-it?)
      test: inCurrentRepo('json'),
      loader: 'json-loader'
    },
    resources: {
      test: (absPath) => absPath.startsWith(lessonSrc), // only in lesson repo
      exclude: /\.md$/,
      loader: 'file-loader?name=[path][name].[hash:6].[ext]&context='+lessonSrc
    }
  };
}

/////////////////////
// THE BASE CONFIG //
/////////////////////

const baseConfig = {
  context: __dirname,
  module: {
    noParse: /node_modules\/scratchblocks\/browser\/scratchblocks\.(min\.)?js/,
    loaders: getValuesAsArray(getLoaders())
  },
  output: {
    path: absBuildDir,
    publicPath: publicPath
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      lessonSrc,
      assets,
      bootstrapStyles
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
      onlyFrontmatter: 'combine?' + JSON.stringify({frontmatter: frontmatterLoaders}),
      onlyContent: 'combine?' + JSON.stringify({content: contentLoaders}),
      frontAndContent: 'combine?' + JSON.stringify({
        frontmatter: frontmatterLoaders,
        content: contentLoaders
      }),
      bundleLessons: 'bundle?name=[path][name]&context='+lessonSrc,
    }
  },
  'markdown-it': {
    html: true,  // allow html in source
    linkify: true,  // parse URL-like text to links
    langPrefix: '',  // no prefix in class for code blocks
    use: [
      MarkdownItAnchor,
      MarkdownItAttrs,
      MarkdownItHeaderSections,
      MarkdownItImplicitFigures,
      [MarkdownItTaskCheckbox, {disabled: false}]
    ],
    highlight
  },
  plugins: [
    new CopyWebpackPlugin([{
      context: lessonSrc,
      from: lessonSrc + '/**/*',
      ignore: '*.md',
      to: absBuildDir + '/[path][name].[ext]'
    }]),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'PUBLICPATH_WITHOUT_SLASH': JSON.stringify(publicPathWithoutSlash)
      }
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/graphics/favicon.png',
      prefix: 'CCV-icons-[hash:6]/'
    })
  ]
};

export default baseConfig;
