import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import routes from './routes-static';

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const appHtml = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
    const template = require('raw!./../dist/server-template.ejs');
    const html = template.replace('<%= appHtml %>', `<div>${appHtml}</div>`);
    callback(null, html);
  });
};
