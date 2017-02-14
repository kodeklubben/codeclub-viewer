/* eslint-env node */

import React from 'react';
import {render} from 'react-dom';
import {applyRouterMiddleware, Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHistory } from 'history';
import useScroll from 'react-router-scroll';
import {Provider} from 'react-redux';
import {routes, routes404} from './routes';
//import routes404 from './routes';
import WithStylesContext from './WithStylesContext';

import App from './pages/App';
import FrontPage from './pages/FrontPage';
import PageNotFound from './pages/PageNotFound';

import store from './store';

const publicPath = process.env.PUBLICPATH_WITHOUT_SLASH;
const historyOptions = publicPath === '/' ? {} : {
  basename: publicPath
};
const browserHistory = useRouterHistory(createHistory)(historyOptions);

// The following onInsertCss function allows multiple styles as arguments in withStyles().
// If we only require one style, it would suffice with onInsertCss = style => style._insertCss()
const onInsertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => {
    removeCss.forEach(f => f());
  };
};

var relativeURL = "./" + document.URL.replace(/^(?:\/\/|[^\/]+)*\//, "");
var urlCorrect = false;
var lessons = store.getState().lessons;
for (var key in lessons) {
  if(key == relativeURL || relativeURL == "./" + lessons[key]['course']) {
    urlCorrect = true;
    break;
  }
}
if (urlCorrect) {
  render(
    <Provider store={store}>
      <WithStylesContext onInsertCss={onInsertCss}>
        <Router routes={routes}
                history={browserHistory}
                render={applyRouterMiddleware(useScroll())}
        />
      </WithStylesContext>
    </Provider>,
    document.getElementById('app')
  );
}
else {
  render(
    <Provider store={store}>
      <WithStylesContext onInsertCss={onInsertCss}>
        <Router routes={routes404}
                history={browserHistory}
                render={applyRouterMiddleware(useScroll())}
        />
      </WithStylesContext>
    </Provider>,
    document.getElementById('app')
  );
}
