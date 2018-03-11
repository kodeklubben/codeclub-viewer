import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match';
import routes from './routes';
import WithStylesContext from './WithStylesContext';
import DocumentTitle from 'react-document-title';
import store from './store';
const template = require('./html-template.ejs');

const renderStatic = (locals, callback) => {
  const history = createMemoryHistory();
  const pathWithoutHtml = locals.path.replace(/\.html$/, '');
  const location = history.createLocation(pathWithoutHtml);

  // console.log('locals.path', locals.path);
  // console.log('locals.assets', locals.assets);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    let css = [];
    // The following onInsertCss function allows multiple styles as arguments in withStyles().
    // If we only require one style, it would suffice with onInsertCss = style => css.push(style._getCss())
    const onInsertCss = (...styles) => {
      styles.forEach(style => css.push(style._getCss()));
    };
    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <WithStylesContext onInsertCss={onInsertCss}>
          <RouterContext {...renderProps} />
        </WithStylesContext>
      </Provider>
    );
    css = [...new Set(css)]; // make array unique

    // TODO: Don't use HtmlWebpackPlugin to create template. Instead, load a simpler
    //       predefined static template, and insert assets (from locals.assets) here
    //       (if possible). If not... what assets are missing?
    // (I guess no point in looking at plugins for HtmlWebpackPlugin if we are not using that plugin...
    //  ... like https://github.com/jharris4/html-webpack-include-assets-plugin)

    //const template = 'LANCE'; //require('raw!buildDir/index-html-template.ejs');
    const appCss = css.length ? `<style type="text/css">${css.join('')}</style>` : '';
    // const html = template
    //   .replace('<%= title %>', DocumentTitle.rewind())
    //   .replace('<%= appCss %>', appCss)
    //   .replace('<%= appHtml %>', `<div>${appHtml}</div>`);
    const pageTitle =  DocumentTitle.rewind();
    const assets = Object.keys(locals.webpackStats.compilation.assets);
    const cssAssets = assets.filter(value => value.match(/\.css$/));
    const jsAssets = assets.filter(value => value.match(/\.js$/));
    const html = template({ cssAssets, jsAssets, appCss, appHtml, pageTitle });

    callback(null, html);
  });
};

export default renderStatic;
