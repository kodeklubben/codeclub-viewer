import webpack from 'webpack';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';

const buildDir = 'dist';

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
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
        // This loader is needed for some packages, e.g. sanitize-html (and markdown-it?)
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      lessons: path.resolve(__dirname, '../oppgaver/src')
    }
  },
  resolveLoader: {
    root: [path.resolve(__dirname, 'node_modules')]
  },
  output: {
    path: path.resolve(__dirname, buildDir),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './' + buildDir,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Kodeklubben',
      template: 'index-template.ejs',
      inject: 'body'
    }),
    new CleanWebpackPlugin([buildDir], {
      root: path.resolve(__dirname),
      dry: false
    })
  ],
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
