import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import routes from './routes';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import {Helmet} from 'react-helmet';
import store from './store';

const template = require('./html-template.ejs');
const faviconTagArray = require('assets/favicon.png');
const faviconHtml = faviconTagArray.join('');

const renderStatic = (locals, callback) => {
  const history = createMemoryHistory();
  const pathWithoutHtml = locals.path.replace(/\.html$/, '');
  const location = history.createLocation(pathWithoutHtml);

  match({ routes, location, basename: locals.publicPath }, (error, redirectLocation, renderProps) => {
    let css = new Set();
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
    const appHtml = ReactDOMServer.renderToString(
      <Provider {...{store}}>
        <StyleContext.Provider value={{insertCss}}>
          <RouterContext {...renderProps} />
        </StyleContext.Provider>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    css = [...new Set(css)]; // make array unique
    const appCss = css.length ? `<style type="text/css">${css.join('')}</style>` : '';
    const webpackAssets = locals.webpackStats.compilation.assets;
    const assets = Object.keys(webpackAssets);
    const cssAssets = assets.filter(p => /\.css$/.test(p)).map(p => locals.publicPath + p);
    const jsAssets = assets.filter(p => /\.js$/.test(p)).map(p => locals.publicPath + p);

    const html = template({ cssAssets, jsAssets, appCss, appHtml, faviconHtml, helmet });

    callback(null, html);
  });
};

export default renderStatic;
