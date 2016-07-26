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
import path from 'path';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';


///////////////
// CONSTANTS //
///////////////
const buildDir = 'dist';
const publicPath = '/';
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
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin()
  ]
};

export default baseConfig;
