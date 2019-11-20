import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {ServerStyleSheets} from '@material-ui/core/styles';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import routes from './routes';
import store from './store';

const template = require('./html-template.ejs');
const faviconTagArray = require('assets/favicon.png');
const faviconHtml = faviconTagArray.join('');

const renderStatic = (locals, callback) => {
  const history = createMemoryHistory();
  const pathWithoutHtml = locals.path.replace(/\.html$/, '');
  const location = history.createLocation(pathWithoutHtml);

  match({ routes, location, basename: locals.publicPath }, (error, redirectLocation, renderProps) => {
    const sheets = new ServerStyleSheets();
    const appHtml = ReactDOMServer.renderToString(sheets.collect(
      <Provider {...{store}}>
        <RouterContext {...renderProps}/>
      </Provider>
    ));
    const cssString = sheets.toString(); 
    const appCss = `<style id='jss-server-side'>${cssString}</style>`;
    const webpackAssets = locals.webpackStats.compilation.assets;
    const assets = Object.keys(webpackAssets);
    const cssAssets = assets.filter(p => /\.css$/.test(p)).map(p => locals.publicPath + p);
    const jsAssets = assets.filter(p => /\.js$/.test(p)).map(p => locals.publicPath + p);

    const html = template({ cssAssets, jsAssets, appCss, appHtml, faviconHtml });

    callback(null, html);
  });
};

export default renderStatic;
