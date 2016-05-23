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
const webpack = require('webpack');

import path from 'path';
import autoprefixer from 'autoprefixer';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';


///////////////
// CONSTANTS //
///////////////
const buildDir = 'dist';
const publicPath = '/';

const cssModuleLoaderStr = 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

// Loaders for lesson files written in markdown (.md)
const frontmatterLoaders = ['json', 'front-matter?onlyAttributes'];
const contentLoaders = ['html', 'markdown-it', 'front-matter?onlyBody'];

const isHot = process.argv.indexOf('--hot') >= 0;
console.log(`isHot=${isHot}`);
const isProduction = process.env.NODE_ENV === 'production';
console.log(`isProduction=${isProduction}`);
console.log();

const filenameBase = isHot ? '[name]' : '[name].[chunkhash]';


///////////////
// FUNCTIONS //
///////////////

function getEntry(){
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
      vendor: Object.keys(pkg.dependencies).filter(function(v){
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

function getPlugins(){
  let plugins = [
    new HtmlWebpackPlugin({
      title: 'Kodeklubben',
      template: 'src/index-template.ejs',
      inject: 'body',
      chunksSortMode: 'dependency' // Make sure they are loaded in the right order in index.html
    }),
    new ForceCaseSensitivityPlugin(),

    // Extract common chunks due to code splitting (such as lessons) and have them loaded in parallel.
    // See https://github.com/webpack/docs/wiki/list-of-plugins#4-extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true
    })
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
          warnings: false
        }
      })
    ]);
  }

  if (!isHot) {
    plugins = plugins.concat([
      new CleanWebpackPlugin([buildDir], {
        root: path.resolve(__dirname),
        dry: false
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
  entry: getEntry(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: isHot ? 'react-hot!babel' : 'babel'
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
      lessonSrc: path.resolve(__dirname, '../oppgaver/src/')
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
    chunkFilename: `${filenameBase}.js`
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
