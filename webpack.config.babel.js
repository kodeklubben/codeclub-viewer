import webpack from 'webpack';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';

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
        // This loader is needed for some packages, e.g. sanitize-html (and markdown-it?)
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: [__dirname+'/node_modules']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
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
