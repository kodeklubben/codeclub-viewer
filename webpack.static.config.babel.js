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
import baseConfig from './webpack.base.config.babel';

import path from 'path';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';

///////////////
// CONSTANTS //
///////////////
const buildDir = 'dist';
const publicPath = '/';

const cssModuleLoaderStr = 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

const scope = {window: {}};
const locals = {};


///////////////
// FUNCTIONS //
///////////////

function getStaticSitePaths() {
  const glob = require('glob');
  const lessonSrc = baseConfig.resolve.alias.lessonSrc;
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


///////////////////////
// THE ACTUAL CONFIG //
///////////////////////

const config = {
  ...baseConfig,
  entry: {
    staticsite: './src/index-static.js'
  },
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
  output: {
    path: path.resolve(__dirname, buildDir),
    publicPath: publicPath,
    filename: 'static-bundle.js',
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
  plugins: [
    ...baseConfig.plugins,
    new StaticSiteGeneratorPlugin('staticsite', getStaticSitePaths(), locals, scope)
  ]
};

export default config;
