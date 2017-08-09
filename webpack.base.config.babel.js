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
import MarkdownItModifyToken from 'markdown-it-modify-token';
import highlight from './src/highlighting.js';
const fs = require('fs');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
// Webpack needs final slash in publicPath to rewrite relative paths correctly
const publicPathWithoutSlash = '/' + subDir;
export const publicPath = publicPathWithoutSlash + (subDir ? '/' : '');
export const lessonSrc = path.resolve(__dirname, '../oppgaver/src');
const assets = path.resolve(__dirname, './src/assets');
const bootstrapStyles = path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/bootstrap');

// Loaders for lesson files written in markdown (.md)
const frontmatterLoaders = ['json-loader', 'front-matter-loader?onlyAttributes'];
const contentLoaders = ['html-loader?attrs=img:src a:data-src', 'markdown-it-loader', 'front-matter-loader?onlyBody'];

const cssModuleLoaderStr = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

//console.log('lessonSrc =', lessonSrc);
//console.log('__dirname =', __dirname);

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
      loader: 'url-loader?limit=5000&name=[path][name].[hash:6].[ext]'
    },
    fonturl: {
      test: inCurrentRepo('woff2?(\\?v=[0-9]\\.[0-9]\\.[0-9])?'),
      loader: 'url-loader?limit=10000'
    },
    fontfile: {
      test: inCurrentRepo('(ttf|eot|svg)(\\?[\\s\\S]+)?'),
      loader: 'file-loader'
    },
    json: {
      // This loader is needed for some packages, e.g. sanitize-html (and markdown-it?)
      test: inCurrentRepo('json'),
      loader: 'json-loader'
    },
    resources: {
      test: (absPath) => absPath.startsWith(lessonSrc), // only in lesson repo
      exclude: /\.md$/,
      loader: 'file-loader?name=[path][name].[hash:6].[ext]'
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
    extensions: ['', '.js'],
    alias: {
      lessonSrc,
      assets,
      bootstrapStyles,
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
    html: true,  // allow html in source
    linkify: true,  // parse URL-like text to links
    langPrefix: '',  // no prefix in class for code blocks
    modifyToken: (token, env) => {
      // see API https://markdown-it.github.io/markdown-it/#Token
      // token will also have an attrObj property added for convenience
      // which allows easy get and set of attribute values.
      // It is prepopulated with the current attr values.
      // Values returned in token.attrObj will override existing attr values.
      // env will contain any properties passed to markdown-it's render
      // Token can be modified in place, no return is necessary

      if (token.type === 'link_open') {
        const href = token.attrObj.href;
        if (typeof href !== 'string' || !href) { return; }

        if (href.startsWith('//') || href.startsWith('http')) { return; }

        // If there is a #, ?, : or @ it means it a url, mailto, or similar, and not a local file:
        if (/[#?:@]/.test(href)) { return; }

        // Ignore any links that ends with .html (and possibly followed by # or ?)
        if (/\.html([#?].*)*$/.test(href)) { return; }

        // Only consider links that end with an extension (after passing the previous tests):
        if (/\.\w+$/.test(href)) {
          console.log('Token', token);
          token.attrObj['data-src'] = decodeURI(href);
          console.log('\nAdded data-src:', token.attrObj['data-src']);
        }
      }
    },
    use: [
      MarkdownItAnchor,
      MarkdownItAttrs,
      MarkdownItHeaderSections,
      MarkdownItImplicitFigures,
      [MarkdownItTaskCheckbox, {disabled: false}],
      MarkdownItModifyToken,
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
