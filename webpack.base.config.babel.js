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
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

///////////////
// CONSTANTS //
///////////////

import {
  buildDir,
  publicPathWithoutSlash,
  publicPath,
  lessonSrc,
  lessonFiltertags,
  assets,
  bootstrapStyles,
} from './buildconstants';

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

// All RegExps that involve paths must have the path parts surrounded by regexpCompPath
const regexpCompPath = (str) => path.normalize(str).replace(/\\/g, '\\\\');

const inCurrentRepo = (extRegexp) => new RegExp('^' + regexpCompPath(__dirname) + '.*\\.' + extRegexp + '$');

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
    resources: {
      test: (absPath) => absPath.startsWith(lessonSrc), // only in lesson repo
      exclude: [/\.md$/, new RegExp(regexpCompPath('/playlists/') + '.*\\.txt$')],
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
    noParse: new RegExp(regexpCompPath('node_modules/scratchblocks/browser/scratchblocks') + '\\.(min\\.)?js'),
    loaders: getValuesAsArray(getLoaders())
  },
  output: {
    path: buildDir,
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      lessonSrc,
      lessonFiltertags,
      assets,
      bootstrapStyles
    }
  },
  resolveLoader: {
    alias: {
      // Markdown-files are parsed only through one of these three aliases, and are
      // not parsed automatically by adding a loader with test /\.md$/ for two reasons:
      // 1) We don't want to use '!!' in the requires in the modules, and
      // 2) Since the lessons create a lot of data, we want to be sure that we only load
      //    what we need by being explicit in the requires, e.g. require('onlyFrontmatter!./file.md')
      //    It is even more important when using in require.context('onlyFrontmatter!./path', ....)
      onlyFrontmatter: 'combine-loader?' + JSON.stringify({frontmatter: frontmatterLoaders}),
      onlyContent: 'combine?' + JSON.stringify({content: contentLoaders}),
      frontAndContent: 'combine?' + JSON.stringify({
        frontmatter: frontmatterLoaders,
        content: contentLoaders
      }),
      bundleLessons: 'bundle?name=[path][name]&context='+lessonSrc,
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        'markdown-it': {
          html: true,  // allow html in source
          linkify: true,  // parse URL-like text to links
          langPrefix: '',  // no prefix in class for code blocks
          use: [
            MarkdownItAttrs,
            MarkdownItHeaderSections,
            MarkdownItImplicitFigures,
            MarkdownItAnchor,
            [MarkdownItTaskCheckbox, {disabled: false}],
          ],
          highlight,
        },
      }
    }),
    new CopyWebpackPlugin([{
      context: lessonSrc,
      from: lessonSrc + '/**/*',
      ignore: '*.md',
      to: buildDir + '/[path][name].[ext]'
    }]),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'PUBLICPATH': JSON.stringify(publicPath),
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
