/**
 *  The webpack config file
 *  ------------------------------
 *
 *  BOOTSTRAP:
 *  To adjust which parts of bootstrap to include in the build, adjust options in .bootstraprc.
 *  The more you include, the bigger the final build will be.
 *  Also, to get smaller builds, do
 *    import Button from 'react-bootstrap/lib/Button';  // YES
 *  rather than
 *    import {Button} from 'react-bootstrap'; // NO
 *
 *
 *  Regarding CSS extraction:
 *  CSS is not extracted for hot reloading (i.e. when isHot is true).
 *  We never extract css from the 'main' entry, since we want this CSS to override CSS from vendors,
 *  e.g. override bootstrap. By not extracting it, it will become inline in the <head>.
 *  (i.e. don't use ExtractTextPlugin.extract() in the css and scss loaders.)
 *  Bootstrap has its own extract-methods (activated f.ex. by using bootstrap-loader/extractStyles)
 *
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
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownCustomContainer from 'markdown-it-container';
import highlight from './src/highlighting';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import SitemapPlugin from 'sitemap-webpack-plugin';
import WebpackShellPluginAlt from 'webpack-shell-plugin-alt';
import WebappWebpackPlugin from 'webapp-webpack-plugin';

import {
  assets,
  bootstrapStyles,
  buildBaseDir,
  buildDir,
  filenameBase,
  isHot,
  lessonFiltertags,
  lessonRepo,
  lessonSrc,
  publicPath,
  publicPathWithoutSlash,
} from './buildconstants';
import { getStaticSitePaths, lessonPaths, coursePaths } from './pathlists';
import { getVideoIframeMarkup } from './src/utils/markdownVideoHandler';

const staticSitePaths = getStaticSitePaths();

const webappWebpackPlugin = new WebappWebpackPlugin({
  logo: path.join(assets, 'favicon.png'),
  inject: 'force',
  prefix: 'icons-[hash:5]/',
  favicons: {
    appName: 'Lær Kidsa Koding',
    appShortName: 'LKK',
    appDescription:
      'På denne siden finner du oppgaver for barn og unge i alle aldre som ønsker ' +
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
    console.log('  bootstrapStyles:', bootstrapStyles);
    console.log('  buildBaseDir:', buildBaseDir);
    console.log('  buildDir:', buildDir);
    console.log('  filenameBase:', filenameBase);
    console.log('  isHot:', isHot);
    console.log('  lessonFiltertags:', lessonFiltertags);
    console.log('  lessonSrc:', lessonSrc);
    console.log('  publicPath:', publicPath);
    console.log('  publicPathWithoutSlash:', publicPathWithoutSlash);
    console.log();
    console.log('  env.NODE_ENV:', env.NODE_ENV);
    console.log('  env.BUILD_PDF:', env.BUILD_PDF);
    console.log();
  }

  // All RegExps that involve paths must have the path parts surrounded by regexpCompPath
  const regexpCompPath = (str) => path.normalize(str).replace(/\\/g, '\\\\');
  const inCurrentRepo = (extRegexp) =>
    new RegExp('^' + regexpCompPath(__dirname) + '.*\\.' + extRegexp + '$');
  const inLessonRepo = (extRegexp) =>
    new RegExp('^' + regexpCompPath(lessonRepo) + '.*\\.' + extRegexp + '$');

  const config = {
    context: __dirname,

    entry: {
      main: [
        isHot ? 'bootstrap-loader' : 'bootstrap-loader/extractStyles',
        './src/index.js',
      ],
    },

    output: {
      path: buildDir,
      publicPath: isHot ? publicPathWithoutSlash : publicPath,
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
        bootstrapStyles,
      },
    },

    resolveLoader: {
      // Since webpack v2, loaders are resolved relative to file. Use abs path so loaders can be used on md-files
      // in lessonSrc as well.
      modules: [path.join(__dirname, 'node_modules')],
      alias: {
        //frontmatter: 'json-loader!front-matter-loader?onlyAttributes',
        // // Markdown-files are parsed only through one of these three aliases, and are
        // // not parsed automatically by adding a loader with test /\.md$/ for two reasons:
        // // 1) We don't want to use '!!' in the requires in the modules, and
        // // 2) Since the lessons create a lot of data, we want to be sure that we only load
        // //    what we need by being explicit in the requires, e.g. require('onlyFrontmatter!./file.md')
        // //    It is even more important when using in require.context('onlyFrontmatter!./path', ....)
        // onlyFrontmatter: 'combine-loader?' + JSON.stringify({frontmatter: frontmatterLoaders}),
        // onlyContent: 'combine?' + JSON.stringify({content: contentLoaders}),
        // frontAndContent: 'combine?' + JSON.stringify({
        //   frontmatter: frontmatterLoaders,
        //   content: contentLoaders
        // }),
        // bundleLessons: 'bundle-loader?name=[path][name]&context=' + lessonSrc,
      },
    },

    module: {
      rules: [
        {
          test: inCurrentRepo('js'),
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: inCurrentRepo('scss'),
          exclude: /node_modules/,
          use: [
            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        webappWebpackPlugin.rule(), // must come before any other image rules
        {
          test: inCurrentRepo('(png|jpg|jpeg|gif)'),
          loader: 'file-loader',
          options: { name: 'CCV-assets/[name].[hash:6].[ext]' },
        },
        {
          test: inCurrentRepo('woff2?(\\?v=[0-9]\\.[0-9]\\.[0-9])?'),
          loader: 'file-loader',
          options: { name: 'CCV-assets/[name].[hash:6].[ext]' },
        },
        {
          test: inCurrentRepo('(ttf|eot|svg)(\\?[\\s\\S]+)?'),
          loader: 'file-loader',
          options: { name: 'CCV-assets/[name].[hash:6].[ext]' },
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
          options: { name: '[path][name].[hash:6].[ext]' },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLICPATH': JSON.stringify(publicPath),
        'process.env.PUBLICPATH_WITHOUT_SLASH': JSON.stringify(
          publicPathWithoutSlash
        ),
        IS_HOT: JSON.stringify(isHot),
      }),

      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname, // needed for bootstrap-loader
          output: {
            path: buildDir, // needed for bootstrap-loader
          },
          'markdown-it': {
            html: true, // allow html in source
            langPrefix: '', // no prefix in class for code blocks
            use: [
              MarkdownItAttrs,
              MarkdownItEmoji,
              MarkdownItHeaderSections,
              MarkdownItImplicitFigures,
              MarkdownItKatex,
              [MarkdownItTaskCheckbox, { disabled: false }],
              [
                MarkdownCustomContainer,
                'video',
                {
                  validate: function (params) {
                    return params.trim().match(/^video\s*\[(.*)]$/);
                  },

                  render: function (tokens, idx) {
                    if (tokens[idx].type === 'container_video_open') {
                      const matches = tokens[idx].info
                        .trim()
                        .match(/^video\s*\[(.*)]$/);

                      if (matches && matches[1]) {
                        return (
                          '<div class="video-container">' +
                          getVideoIframeMarkup({ url: matches[1].trim() })
                        );
                      }
                    } else if (tokens[idx].type === 'container_video_close') {
                      return '</div>';
                    }
                  },
                },
              ],
            ],
            highlight,
          },
        },
      }),

      new CopyWebpackPlugin([
        {
          // Copy all resource files (i.e. all files not included via javascript)
          context: lessonSrc,
          from: lessonSrc + '/**/*',
          ignore: ['*.md', '*.yml'],
          to: buildDir + '/[path][name].[ext]',
        },
        {
          // Copy extra files that need to be included
          from: './src/assets/deploy/',
          to: buildDir,
        },
      ]),

      new CaseSensitivePathsPlugin(),

      ...(env.BUILD_PDF
        ? [
          new WebpackShellPluginAlt({
            onBuildEnd: ['node createLessonPdfs.js'],
          }),
        ]
        : [
          // copy FakeLessonPDF.pdf to all the lessons
          // (with the same name as the .md-file, e.g. astrokatt.md --> astrokatt.pdf)
          new CopyWebpackPlugin(
            lessonPaths('.pdf', env.verbose).map((pdfPath) => ({
              from: 'src/assets/pdfs/FakeLessonPDF.pdf',
              to: path.join(buildDir, pdfPath),
            })),
            {
              // Must include copyUnmodified:true since we always copy from same file,
              // otherwise only the first path is copied to.
              // See https://github.com/webpack-contrib/copy-webpack-plugin/issues/99
              copyUnmodified: true,
            }
          ),
        ]),

      ...(isHot
        ? [
          // Create the root index.html
          new HtmlWebpackPlugin({
            template: 'src/index-template.ejs',
            inject: false,
            chunksSortMode: 'dependency', // Make sure they are loaded in the right order in index.html
          }),
        ]
        : [
          new CleanWebpackPlugin(buildBaseDir),
          new ExtractTextPlugin({
            filename: filenameBase + '.css',
            allChunks: false,
          }),
          new StaticSiteGeneratorPlugin({
            entry: 'main',
            paths: staticSitePaths,
            locals: {
              publicPath,
            },
            globals: {
              window: {},
            },
          }),
          new SitemapPlugin(
            'https://oppgaver.kidsakoder.no' + publicPath,
            staticSitePaths
          ),
          // Insert index.html-files with redirects for all courses, e.g. /scratch/index.html redirects to /scratch
          // This is because on github, an url with a slash at the end,
          // e.g. scratch/, is interpreted as scratch.index.html
          new CopyWebpackPlugin(
            coursePaths()
              .concat(lessonPaths())
              .map((p) => ({
                from: 'src/redirect-template.ejs',
                to: path.join(buildDir, p, 'index.html'),
                // split + join to replace all occurrances
                transform: (content) =>
                  content
                    .toString('utf8')
                    .split('<%-REDIRECT-URL%>')
                    .join(publicPath + p),
              })),
            {
              // Must include copyUnmodified:true since we always copy from same file,
              // otherwise only the first path is copied to.
              // See https://github.com/webpack-contrib/copy-webpack-plugin/issues/99
              copyUnmodified: true,
            }
          ),
        ]),

      webappWebpackPlugin,
    ],

    devServer: {
      historyApiFallback: {
        // needed when using browserHistory (instead of hashHistory)
        index: `${publicPath}index.html`,
        disableDotRule: true,
      },
    },
  };

  return config;
};

export default createConfig;
