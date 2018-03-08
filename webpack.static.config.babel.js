/**
 *  The webpack static config file
 *  ------------------------------
 *
 *  Writes index.html files for all courses and all lessons, so that search engines can reach them,
 *  and as an alternative to server side rendering (static html files is possible since we don't
 *  have data in a database). After the initial index.html is loaded, the scripts take over and
 *  make it a single page app.
 *
 *  Note that (identical copies of) all images are output again, which isn't really necessary.
 *  Also the static-bundle.js isn't used for anything.
 *  If we could find a way of not outputting these files (only the html files) during build,
 *  that would be good.
 *
 */

console.log();
console.log('########################################');
console.log(' Running webpack.static.config.babel.js ');
console.log('########################################');
console.log();

////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////

/* eslint-env node */


//////////////////////
// IMPORT / REQUIRE //
//////////////////////

import baseConfig from './webpack.base.config.babel';
import {getStaticSitePaths} from './pathlists';

import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import SitemapPlugin from 'sitemap-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin';


///////////////
// CONSTANTS //
///////////////

import {buildDir, publicPath, buildPDF} from './buildconstants';
console.log('buildDir:', buildDir);
console.log('publicPath:', publicPath);
console.log('buildPDF:', buildPDF);
console.log();

const scope = {window: {}};
const locals = {};
const staticSitePaths = getStaticSitePaths();

///////////////////////
// THE ACTUAL CONFIG //
///////////////////////

const config = {
  ...baseConfig,
  entry: {
    staticbundle: './src/index-static.js'
  },
  output: {
    ...baseConfig.output,
    filename: 'static-bundle.js',
    // static-site-generator must have files compiled to UMD or CommonJS
    // so they can be required in a Node context:
    libraryTarget: 'umd'
  },
  resolve: {
    ...baseConfig.resolve,
    alias: {
      ...baseConfig.resolve.alias,
      buildDir
    }
  },
  plugins: [
    ...baseConfig.plugins,
    new StaticSiteGeneratorPlugin('staticbundle', staticSitePaths, locals, scope),
    new SitemapPlugin('http://oppgaver.kidsakoder.no' + publicPath, staticSitePaths),
  ]
};

if (buildPDF) {
  config.plugins = config.plugins.concat([new WebpackShellPlugin({onBuildEnd:['node createLessonPdfs.js']})]);
}

export default config;
