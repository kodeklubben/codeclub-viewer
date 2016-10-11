/* eslint-env node */

import React from 'react';
import {render} from 'react-dom';
import {applyRouterMiddleware, Router, useRouterHistory} from 'react-router';
import { createHistory } from 'history';
import useScroll from 'react-router-scroll';
import {Provider} from 'react-redux';
import routes from './routes';
import WithStylesContext from './WithStylesContext';

import store from './store';

const publicPath = process.env.PUBLICPATH_WITHOUT_SLASH;
const historyOptions = publicPath === '/' ? {} : {
  basename: publicPath
};
const browserHistory = useRouterHistory(createHistory)(historyOptions);

render(
  <Provider store={store}>
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
      <Router routes={routes}
              history={browserHistory}
              render={applyRouterMiddleware(useScroll())}
      />
    </WithStylesContext>
  </Provider>,
  document.getElementById('app')
);
