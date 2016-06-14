import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import routes from './routes-static';

// Exported static site renderer:
export default (locals, callback) => {
  //console.log('\nSERVER RENDER: ' + locals.path);
  //console.log(locals.assets);
  //console.log(locals.webpackStats);

  const jsHtml = Object.keys(locals.assets).reduce((total, current) => {
    total = total + `<script type="text/javascript" src="${locals.assets[current]}"></script>`;
    return total;
  }, '');

  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // console.log('------------');
    // console.log('renderProps:');
    // console.log(renderProps);
    // console.log('------------');

    const html = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
    callback(null,
      `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>From server: Kodeklubben</title>
</head>
<body>
    <div id="app"><div>${html}</div></div>
     ${jsHtml}
</body>
</html>`
    );
  });
};
