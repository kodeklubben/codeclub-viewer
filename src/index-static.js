import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import routes from './routes-static';
import WithStylesContext from './WithStylesContext';

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const css = [];
    const appHtml = ReactDOMServer.renderToString(
      <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
        <RouterContext {...renderProps} />
      </WithStylesContext>
    );
    const template = require('raw!./../dist/index-html-template.ejs');
    const appCss = css.length ? `<style type="text/css">${css.join('')}</style>` : '';
    const html = template
      .replace('<%= appCss %>', appCss)
      .replace('<%= appHtml %>', `<div>${appHtml}</div>`);
    callback(null, html);
  });
};
