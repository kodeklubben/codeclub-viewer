////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////
/* eslint-env node */

import webpack from 'webpack';
import path from 'path';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';
import MarkdownItTaskCheckbox from 'markdown-it-task-checkbox';
import highlight from './src/highlighting';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {
  assets,
  bootstrapStyles,
  buildDir,
  buildPDF,
  filenameBase,
  isHot,
  isProduction,
  lessonFiltertags,
  lessonSrc,
  publicPath,
  publicPathWithoutSlash,
} from './buildconstants';
import {lessonPaths} from './pathlists';

const createConfig = (env = {}) => {

  if (env.verbose) {
    console.log('Build constants:');
    console.log('  assets:', assets);
    console.log('  bootstrapStyles:', bootstrapStyles);
    console.log('  buildDir:', buildDir);
    console.log('  buildPDF:', buildPDF);
    console.log('  filenameBase:', filenameBase);
    console.log('  isHot:', isHot);
    console.log('  isProduction:', isProduction);
    console.log('  lessonFiltertags:', lessonFiltertags);
    console.log('  lessonSrc:', lessonSrc);
    console.log('  publicPath:', publicPath);
    console.log('  publicPathWithoutSlash:', publicPathWithoutSlash);
    console.log();
  }

  const cssModuleLoader = {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]__[hash:base64:5]',
    },
  };

  // All RegExps that involve paths must have the path parts surrounded by regexpCompPath
  const regexpCompPath = (str) => path.normalize(str).replace(/\\/g, '\\\\');
  const inCurrentRepo = (extRegexp) => new RegExp('^' + regexpCompPath(__dirname) + '.*\\.' + extRegexp + '$');

  const config = {
    context: __dirname,

    entry: {
      main: [
        './src/index.js',
        isHot ? 'bootstrap-loader' : 'bootstrap-loader/extractStyles',
      ],
      //staticbundle: './src/index-static.js',
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
      // Since webpack v2, loaders are resolved relative to file. Use abs path so loaders can be used on md-files
      // in lessonSrc as well.
      modules: [path.join(__dirname, 'node_modules')],
      alias: {
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
        bundleLessons: 'bundle-loader?name=[path][name]&context=' + lessonSrc,
      }
    },

    module: {
      rules: [
        {
          test: inCurrentRepo('js'),
          exclude: /node_modules/,
          use: isHot ? [
            'react-hot-loader',
            'babel-loader',
          ] : [
            'babel-loader',
          ],
        },
        {
          test: inCurrentRepo('css'),
          exclude: /node_modules/,
          use: [
            'isomorphic-style-loader',
            cssModuleLoader,
            'postcss-loader'
          ],
        },
        {
          test: inCurrentRepo('scss'),
          exclude: /node_modules/,
          use: [
            'isomorphic-style-loader',
            cssModuleLoader,
            'postcss-loader',
            'sass-loader'
          ],
        },
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
          test: /\.txt$/,
          loader: 'raw-loader',
        },
        {
          test: /\.md$/,
          loader: 'combine-loader',
          options: {
            //raw: 'raw-loader',
            frontmatter: [
              'json-loader',
              'front-matter-loader?onlyAttributes'
            ],
            content: [
              'html-loader?attrs=false',
              'markdown-it-loader',
              'front-matter-loader?onlyBody',
            ],
          },
        },
        {
          test: (absPath) => absPath.startsWith(lessonSrc), // only in lesson repo
          exclude: [/\.md$/, /\.txt$/],
          loader: 'file-loader',
          options: {name: '[path][name].[hash:6].[ext]&context=' + lessonSrc},
        },
      ],
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,   // needed for bootstrap-loader
          output: {
            path: buildDir,     // needed for bootstrap-loader
          },
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
      }),

      // Create the root index.html needed regardless of whether we make the other static index.htmls.
      new HtmlWebpackPlugin({
        title: 'Kodeklubben',
        template: 'src/index-template.ejs',
        inject: false,
        chunksSortMode: 'dependency' // Make sure they are loaded in the right order in index.html
      }),

      // Create template for the static non-root index.html files
      new HtmlWebpackPlugin({
        title: '<%= title %>',
        filename: 'index-html-template.ejs',
        appcss: '<%= appCss %>',
        appcontent: '<%= appHtml %>',
        template: 'src/index-template.ejs',
        inject: false,
        chunksSortMode: 'dependency' // Make sure they are loaded in the right order in index.html
      }),

      new HtmlWebpackPlugin({
        title: '404 - Page Not Found',
        filename: '404.html',
        template: 'src/404-template.ejs',
        inject: false,
        redirectUrl: publicPath
      }),

      ...(isProduction ? [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: true,
            pure_funcs: 'console.log', // removes these functions from the code
          }
        }),
      ] : []),

      ...(!buildPDF ? [
        // copy FakeLessonPDF.pdf to all the lessons
        // (with the same name as the .md-file, e.g. astrokatt.md --> astrokatt.pdf)
        new CopyWebpackPlugin(lessonPaths('.pdf', env.verbose).map(pdfPath => ({
          from: 'src/assets/pdfs/FakeLessonPDF.pdf',
          to: path.join(buildDir, pdfPath),
        })), {
          // Must include copyUnmodified:true since we always copy from same file,
          // otherwise only the first path is copied to.
          // See https://github.com/webpack-contrib/copy-webpack-plugin/issues/99
          copyUnmodified: true,
        })
      ] : []),

      ...(!isHot ? [
        new CleanWebpackPlugin(buildDir),
        new ExtractTextPlugin({filename: filenameBase + '.css', allChunks: false}),
        // new webpack.optimize.CommonsChunkPlugin({
        //   names: ['vendor', 'manifest']  // Extract vendor and manifest files; only if vendor is defined in entry
        // }),
      ] : []),

    ],

    devServer: {
      historyApiFallback: { // needed when using browserHistory (instead of hashHistory)
        index: publicPath
      },
      //outputPath: buildDir // needed for copy-webpack-plugin when "to" is an abs. path
    },
  };

  return config;
};

export default createConfig;
