/* eslint-env node */
/* global IS_HOT */

import React from 'react';
import {render, hydrate} from 'react-dom';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'react-router-scroll/lib/useScroll';
import {Provider} from 'react-redux';
import routes from './routes';
import WithStylesContext from './WithStylesContext';
import store, {updateStoreFromLocalStorage} from './store';
import {setHydrationComplete} from './reducers/hydration';

const renderDynamic = () => {
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

  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const renderFunc = IS_HOT ? render : hydrate;
  renderFunc(
    <Provider store={store}>
      <WithStylesContext onInsertCss={onInsertCss}>
        <Router routes={routes}
          history={browserHistory}
          render={applyRouterMiddleware(useScroll())}
        />
      </WithStylesContext>
    </Provider>,

    document.getElementById('app'),

    callback,
  );
};

export default renderDynamic;
