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
  console.log('\n\nSERVER RENDER');
  console.log(locals.path);
  console.log(locals.assets);

  const jsHtml = Object.keys(locals.assets).reduce((total, current) => {
    total = total + `<script type="text/javascript" src="${locals.assets[current]}"></script>`;
    return total;
  }, '');

  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
    callback(null,
      `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>From server: Kodeklubben</title>
</head>
<body>
    <div id="app">${html}</div>
     ${jsHtml}
</body>
</html>`
    );
  });
};
