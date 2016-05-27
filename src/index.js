import React from 'react';
import {render} from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, browserHistory, createMemoryHistory, RouterContext, match } from 'react-router';
import routes from './routes';

// Client render (optional):
if (typeof document !== 'undefined') {
  console.log('CLIENT RENDER');
  render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('app')
  );
}

// Exported static site renderer:
export default (locals, callback) => {
  console.log('SERVER RENDER');
  console.log(locals);

  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
    callback(null, html);
  });
};
