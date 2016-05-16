import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';

const buildDir = 'dist';
const publicPath = '/';

const cssModuleLoaderStr = 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', cssModuleLoaderStr, 'postcss']
      }, {
        test: /\.scss$/,
        loaders: ['style', cssModuleLoaderStr, 'postcss', 'sass']
      },
      {
        test: /\.md$/,
        loader: 'combine-loader?' + JSON.stringify({
          frontmatter: ['json-loader', 'front-matter-loader?onlyAttributes'],
          content: ['html-loader', 'markdown-it-loader', 'front-matter?onlyBody']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=5000&name=img/[path][name].[hash:6].[ext]'
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
    root: [path.resolve(__dirname, 'node_modules')]
  },
  output: {
    path: path.resolve(__dirname, buildDir),
    publicPath: publicPath,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './' + buildDir,
    hot: true,
    historyApiFallback: true // needed when using browserHistory (instead of hashHistory)
  },
  historyApiFallback: {
    index: publicPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Kodeklubben',
      template: 'src/index-template.ejs',
      inject: 'body'
    }),
    new CleanWebpackPlugin([buildDir], {
      root: path.resolve(__dirname),
      dry: false
    })
  ],
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
