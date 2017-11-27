/* eslint-env node */

import './polyfills';
import React from 'react';
import {render} from 'react-dom';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'react-router-scroll';
import {Provider} from 'react-redux';
import routes from './routes';
import WithStylesContext from './WithStylesContext';

import store from './store';

const publicPath = process.env.PUBLICPATH_WITHOUT_SLASH;
const historyOptions = publicPath === '/' ? {} : {
  basename: publicPath
};
const browserHistory = useRouterHistory(createBrowserHistory)(historyOptions);

// The following onInsertCss function allows multiple styles as arguments in withStyles().
// If we only require one style, it would suffice with onInsertCss = style => style._insertCss()
const onInsertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => {
    removeCss.forEach(f => f());
  };
};

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
