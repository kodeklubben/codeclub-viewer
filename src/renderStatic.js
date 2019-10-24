import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {createMemoryHistory, match} from 'react-router';
import App from './pages/App';
import {Helmet} from 'react-helmet';
import store from './store';

const template = require('./html-template.ejs');
const faviconTagArray = require('assets/favicon.png');
const faviconHtml = faviconTagArray.join('');

const renderStatic = (locals, callback) => {
  const history = createMemoryHistory();
  const pathWithoutHtml = locals.path.replace(/\.html$/, '');
  const location = history.createLocation(pathWithoutHtml);

  match({ location, basename: locals.publicPath }, (error, redirectLocation, renderProps) => {
    const appHtml = ReactDOMServer.renderToString(
      <Provider {...{store}}>
        <App/>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    const webpackAssets = locals.webpackStats.compilation.assets;
    const assets = Object.keys(webpackAssets);
    const cssAssets = assets.filter(p => /\.css$/.test(p)).map(p => locals.publicPath + p);
    const jsAssets = assets.filter(p => /\.js$/.test(p)).map(p => locals.publicPath + p);

    const html = template({ cssAssets, jsAssets, appHtml, faviconHtml, helmet });

    callback(null, html);
  });
};

export default renderStatic;
