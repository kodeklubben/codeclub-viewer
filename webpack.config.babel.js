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


////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////

/* global process __dirname */


//////////////////////
// IMPORT / REQUIRE //
//////////////////////

import baseConfig, {getValuesAsArray, getLoaders} from './webpack.base.config.babel';
const webpack = require('webpack');

import path from 'path';
import autoprefixer from 'autoprefixer';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


///////////////
// CONSTANTS //
///////////////

const buildDir = 'dist';
const publicPath = '/';

const isHot = process.argv.indexOf('--hot') >= 0;
console.log(`isHot=${isHot}`);
const isProduction = process.env.NODE_ENV === 'production';
console.log(`isProduction=${isProduction}`);
console.log();

const filenameBase = isHot ? '[name]' : '[name].[chunkhash]';

///////////////
// FUNCTIONS //
///////////////

function getEntry() {
  const appEntry = './src/index.js';
  if (isHot) {
    return {
      main: [
        'bootstrap-loader',
        appEntry
      ]
    };
  } else {
    console.log('Splitting out vendors to separate chunks (vendor and vendor2):');

    // Get all packages that exist in package.json's 'dependencies' into config.entry.vendor:
    const pkg = require('./package.json');

    // Exclude any packages that don't play nice with CommonsChunkPlugin, and add them via vendor2:
    const excludeFromVendorEntry = ['react-bootstrap'];

    return {
      // Include all dependencies from package.json:
      vendor: Object.keys(pkg.dependencies).filter(function(v) {
        const includeVendor = excludeFromVendorEntry.indexOf(v) < 0;
        if (!includeVendor) {
          console.log(`    ---> EXCLUDED from the 'vendor' chunk: ${v}`);
        }
        return includeVendor;
      }),
      vendor2: [  // Include other vendors not in 'vendor'
        'bootstrap-loader/extractStyles'
      ],
      main: appEntry
    };
  }
}

function getPlugins() {
  let plugins = [
    // Create the root index.html needed regardless of whether we make the other static index.htmls.
    new HtmlWebpackPlugin({
      title: 'Kodeklubben',
      template: 'src/index-template.ejs',
      inject: 'body',
      chunksSortMode: 'dependency' // Make sure they are loaded in the right order in index.html
    }),
    // Create template for the static non-root index.html files
    new HtmlWebpackPlugin({
      title: 'Kodeklubben (server)',
      filename: 'index-html-template.ejs',
      appcontent: '<%= appHtml %>',
      template: 'src/index-template.ejs',
      inject: 'body',
      chunksSortMode: 'dependency' // Make sure they are loaded in the right order in index.html
    }),
    //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/)
    new webpack.IgnorePlugin(/(README|index)\.md$/)
  ];

  if (isProduction) {
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          pure_funcs: 'console.log' // removes these functions from the code
        }
      })
    ]);
  }

  if (!isHot) {
    plugins = plugins.concat([
      new CleanWebpackPlugin([buildDir], {
        root: path.resolve(__dirname)
      }),
      new ExtractTextPlugin(filenameBase + '.css', {allChunks: false}),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']  // Extract vendor and manifest files; only if vendor is defined in entry
      })
    ]);
  }

  return plugins;
}


///////////////////////
// THE ACTUAL CONFIG //
///////////////////////

const config = {
  ...baseConfig,
  entry: getEntry(),
  output: {
    ...baseConfig.output,
    filename: `${filenameBase}.js`,
    chunkFilename: `${filenameBase}.js`
  },
  devServer: {
    historyApiFallback: true // needed when using browserHistory (instead of hashHistory)
  },
  historyApiFallback: {
    index: publicPath
  },
  plugins: getPlugins(),
  postcss: [autoprefixer]
};

////////////////////
// Modify loaders //
////////////////////

if (isHot) {
  const loaders = getLoaders();
  loaders.js.loader = 'react-hot!' + loaders.js.loader;
  config.module.loaders = getValuesAsArray(loaders);
}

export default config;
