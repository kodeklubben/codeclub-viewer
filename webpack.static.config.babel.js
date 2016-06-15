/**
 *  The webpack config file
 *  -----------------------
 *
 *  BOOTSTRAP:
 *  To adjust which parts of bootstrap to include in the build, adjust options in .bootstraprc.
 *  The more you include, the bigger the final build will be.
 *  Also, to get smaller builds, do
 *    import Button from 'react-bootstrap/lib/Button';  // YES
 *  rather than
 *    import { Button } from 'react-bootstrap'; // NO
 *
 *
 *  Regarding CSS extraction:
 *  CSS is not extracted for hot reloading (i.e. when isHot is true).
 *  We never extract css from the 'main' entry, since we want this CSS to override CSS from vendors,
 *  e.g. override bootstrap. By not extracting it, it will become inline in the <head>.
 *  (i.e. don't use ExtractTextPlugin.extract() in the css and scss loaders.)
 *  Bootstrap has its own extract-methods (activated f.ex. by using bootstrap-loader/extractStyles)
 *
 */

// TODO:
// See if it is possible to build the md-files in separate chunks. How? Perhaps separate entries?
// Or perhaps CommonsChunkPlugin manages that by itself?
// Preferrably we want each course in a separate chunk.
// Btw, Should the courses be listed in a specific order? What is done on website today?
// I guess it would be ok to list the courses manually...


////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////
/* global process __dirname */


//////////////////////
// IMPORT / REQUIRE //
//////////////////////
import path from 'path';
import autoprefixer from 'autoprefixer';

import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';


import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';


///////////////
// CONSTANTS //
///////////////
const buildDir = 'dist';
const publicPath = '/';
const lessonSrc = '../oppgaver/src';

const cssModuleLoaderStr = 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

// Loaders for lesson files written in markdown (.md)
const frontmatterLoaders = ['json', 'front-matter?onlyAttributes'];
const contentLoaders = ['html', 'markdown-it', 'front-matter?onlyBody'];

const isProduction = process.env.NODE_ENV === 'production';
console.log(`isProduction=${isProduction}`);
console.log();

const filenameBase = '[name].static.[chunkhash]';

const scope = {window: {}};
const locals = {};


///////////////
// FUNCTIONS //
///////////////

function getStaticSitePaths() {
  var glob = require('glob');
  const absLessonSrc = path.resolve(__dirname, lessonSrc);
  const coursePaths = glob.sync(path.join(absLessonSrc, '*/'), {dot: true})
  //.slice(0,1)
    .map(p => p.replace(new RegExp(`^(${absLessonSrc}\/)(.*)(\/)$`), '$2'));
  const lessonPaths = glob.sync(path.join(absLessonSrc, '*/*/*.md'))
    .filter(p => !p.endsWith('index.md') && !p.endsWith('README.md'))
    //.slice(0,1)
    .map(p => p.replace(new RegExp(`^(${absLessonSrc}\/)(.*)(\.md)$`), '$2'));
  const staticPaths = ['/'].concat(coursePaths).concat(lessonPaths);
  //const staticPaths = [].concat(lessonPaths);

  console.log('Static paths:');
  console.log(staticPaths);

  return staticPaths;
  // return [
  //   '/',
  //   '/scratch',
  //   'scratch/3d_flakser/3d_flakser_1'
  // ];
}

function getEntry() {
  return {
    staticsite: './src/index-static.js'
  };
}

function getPlugins() {
  return [
    new StaticSiteGeneratorPlugin('staticsite', getStaticSitePaths(), locals, scope)
  ];
}


///////////////////////
// THE ACTUAL CONFIG //
///////////////////////

const config = {
  entry: getEntry(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', cssModuleLoaderStr, 'postcss']
      }, {
        test: /\.scss$/,
        loaders: ['style', cssModuleLoaderStr, 'postcss', 'sass']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=5000&name=[path][name].[hash:6].[ext]'
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },
      {
        // This loader is needed for some packages, e.g. sanitize-html (and markdown-it?)
        test: /\.json$/,
        loader: 'json'
      }
    ]
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
  output: {
    path: path.resolve(__dirname, buildDir),
    publicPath: publicPath,
    filename: `${filenameBase}.js`,
    chunkFilename: `${filenameBase}.js`,
    // static-site-generator must have files compiled to UMD or CommonJS
    // so they can be required in a Node context:
    libraryTarget: 'umd'
  },
  devServer: {
    historyApiFallback: true // needed when using browserHistory (instead of hashHistory)
  },
  historyApiFallback: {
    index: publicPath
  },
  plugins: getPlugins(),
  postcss: [autoprefixer],
  'markdown-it': {
    preset: 'commonmark',
    //typographer: true,
    use: [
      MarkdownItAnchor,
      MarkdownItAttrs,
      MarkdownItHeaderSections,
      MarkdownItImplicitFigures
    ]
  }
};

export default config;
