import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import routes from './routes-static';
import WithStylesContext from './WithStylesContext';
import store from './store';

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    let css = [];
    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
          <RouterContext {...renderProps} />
        </WithStylesContext>
      </Provider>
    );
    css = [...new Set(css)]; // make array unique
    const template = require('raw!buildDir/index-html-template.ejs');
    const appCss = css.length ? `<style type="text/css">${css.join('')}</style>` : '';
    const html = template
      .replace('<%= appCss %>', appCss)
      .replace('<%= appHtml %>', `<div>${appHtml}</div>`);
    callback(null, html);
  });
};
