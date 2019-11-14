/**
 *  The webpack config file
 *  ------------------------------
 *
 *  StaticSiteGeneratorPlugin:
 *  Writes index.html files for all courses and all lessons, so that search engines can reach them,
 *  and as an alternative to server side rendering (static html files is possible since we don't
 *  have data in a database). After the initial index.html is loaded, the scripts take over and
 *  make it a single page app.
 */

// TODO: Extract some vendors into separate chunk

////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////
/* eslint-env node */

import webpack from 'webpack';
import path from 'path';

import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';
import MarkdownItKatex from 'markdown-it-katex';
import MarkdownItTaskCheckbox from 'markdown-it-task-checkbox';
import highlight from './src/highlighting';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import SitemapPlugin from 'sitemap-webpack-plugin';
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin';
import WebappWebpackPlugin from 'webapp-webpack-plugin';
import {
  assets,
  buildDir,
  filenameBase,
  isHot,
  lessonFiltertags,
  lessonRepo,
  lessonSrc,
  publicPath,
} from './buildconstants';
import {getStaticSitePaths, lessonPaths, coursePaths} from './pathlists';

const staticSitePaths = getStaticSitePaths();

const webappWebpackPlugin = new WebappWebpackPlugin({
  logo: path.join(assets, 'favicon.png'),
  inject: 'force',
  prefix: 'icons-[hash:5]/',
  favicons: {
    appName: 'Lær Kidsa Koding',
    appShortName: 'LKK',
    appDescription: 'På denne siden finner du oppgaver for barn og unge i alle aldre som ønsker ' +
                    'å lære programmering. Alt innholdet på siden er gratis å bruke, ' +
                    'og er ofte benyttet på kodeklubben og programmeringsfag i skolen.',
    developerName: null,
    developerURL: null,
    lang: 'nb',
    background: '#fff',
    theme_color: '#fff',
    display: 'standalone',
    orientation: 'any',
    start_url: '/',
    icons: {
      coast: false,
      yandex: false,
    },
  },
});

const createConfig = (env = {}, argv) => {

  if (env.verbose) {
    console.log('Build constants:');
    console.log('  assets:', assets);
    console.log('  buildDir:', buildDir);
    console.log('  filenameBase:', filenameBase);
    console.log('  isHot:', isHot);
    console.log('  lessonFiltertags:', lessonFiltertags);
    console.log('  lessonSrc:', lessonSrc);
    console.log('  publicPath:', publicPath);
    console.log();

    console.log('  env.NODE_ENV:', env.NODE_ENV);
    console.log();
  }

  // All RegExps that involve paths must have the path parts surrounded by regexpCompPath
  const regexpCompPath = (str) => path.normalize(str).replace(/\\/g, '\\\\');
  const inCurrentRepo = (extRegexp) => new RegExp('^' + regexpCompPath(__dirname) + '.*\\.' + extRegexp + '$');
  const inLessonRepo = (extRegexp) => new RegExp('^' + regexpCompPath(lessonRepo) + '.*\\.' + extRegexp + '$');

  const config = {
    context: __dirname,

    entry: {
      main: './src/index.js',
    },

    output: {
      path: buildDir,
      publicPath: publicPath,
      filename: `${filenameBase}.js`,
      chunkFilename: `${filenameBase}.js`,

      // static-site-generator must have files compiled to UMD or CommonJS
      // so they can be required in a Node context:
      libraryTarget: 'umd',
    },

    performance: {
      hints: argv.mode === 'production' ? 'warning' : false,
    },

    resolve: {
      extensions: ['.js'],
      alias: {
        lessonSrc,
        lessonFiltertags,
        assets,
      }
    },

    module: {
      rules: [
        {
          test: inCurrentRepo('js'),
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        webappWebpackPlugin.rule(), // must come before any other image rules
        {
          test: inCurrentRepo('(png|jpg|jpeg|gif)'),
          loader: 'file-loader',
          options: {name: 'CCV-assets/[name].[hash:6].[ext]'},
        },
        {
          test: inCurrentRepo('woff2?(\\?v=[0-9]\\.[0-9]\\.[0-9])?'),
          loader: 'file-loader',
          options: {name: 'CCV-assets/[name].[hash:6].[ext]'},
        },
        {
          test: inCurrentRepo('(ttf|eot|svg)(\\?[\\s\\S]+)?'),
          loader: 'file-loader',
          options: {name: 'CCV-assets/[name].[hash:6].[ext]'},
        },
        {
          test: inCurrentRepo('ejs'),
          loader: 'ejs-compiled-loader',
        },
        {
          test: inLessonRepo('txt'),
          loader: 'raw-loader',
        },
        {
          test: inLessonRepo('ya?ml'),
          loader: 'yml-loader',
        },
        {
          test: inLessonRepo('md'),
          use: [
            'html-loader?attrs=false',
            'markdown-it-loader',
            'front-matter-loader?onlyBody',
          ],
        },
        {
          test: inLessonRepo('png'),
          loader: 'file-loader',
          options: {name: '[path][name].[hash:6].[ext]'},
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLICPATH': JSON.stringify(publicPath),
        'IS_HOT': JSON.stringify(isHot),
      }),

      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,   // needed for bootstrap-loader
          output: {
            path: buildDir,     // needed for bootstrap-loader
          },
          'markdown-it': {
            html: true,  // allow html in source
            langPrefix: '',  // no prefix in class for code blocks
            use: [
              MarkdownItAttrs,
              MarkdownItHeaderSections,
              MarkdownItImplicitFigures,
              MarkdownItKatex,
              [MarkdownItTaskCheckbox, {disabled: false}],
            ],
            highlight,
          },
        }
      }),

      new CopyWebpackPlugin([
        { // Copy all resource files (i.e. all files not included via javascript)
          context: lessonSrc,
          from: lessonSrc + '/**/*',
          ignore: ['*.md', '*.yml'],
          to: buildDir + '/[path][name].[ext]'
        },
        { // Copy extra files that need to be included
          from: './src/assets/deploy/',
          to: buildDir
        }
      ]),

      new CaseSensitivePathsPlugin(),

      ...(isHot ? [
        // Create the root index.html
        new HtmlWebpackPlugin({
          template: 'src/index-template.ejs',
          inject: false,
          chunksSortMode: 'dependency' // Make sure they are loaded in the right order in index.html
        }),
      ] : [
        new CleanWebpackPlugin(buildDir),
        new StaticSiteGeneratorPlugin({
          entry: 'main',
          paths: staticSitePaths,
          locals: {
            publicPath
          },
          globals: {
            window: {}
          }
        }),
        new SitemapPlugin('https://oppgaver.kidsakoder.no' + publicPath, staticSitePaths),
        // Insert index.html-files with redirects for all courses, e.g. /scratch/index.html redirects to /scratch
        // This is because on github, an url with a slash at the end,
        // e.g. scratch/, is interpreted as scratch.index.html
        new CopyWebpackPlugin(coursePaths().concat(lessonPaths()).map(p => ({
          from: 'src/redirect-template.ejs',
          to: path.join(buildDir, p, 'index.html'),
          // split + join to replace all occurrances
          transform: (content) => content.toString('utf8').split('<%-REDIRECT-URL%>').join(publicPath + p)
        })), {
          // Must include copyUnmodified:true since we always copy from same file,
          // otherwise only the first path is copied to.
          // See https://github.com/webpack-contrib/copy-webpack-plugin/issues/99
          copyUnmodified: true,
        }),
      ]),

      webappWebpackPlugin,

      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }),

    ],

    devServer: {
      historyApiFallback: { // needed when using browserHistory (instead of hashHistory)
        index: `${publicPath}index.html`,
        disableDotRule: true
      },
    },
  };

  return config;
};

export default createConfig;
