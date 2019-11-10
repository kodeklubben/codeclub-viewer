/* eslint-env node */
/* global IS_HOT */

import React from 'react';
import {render, hydrate} from 'react-dom';
import {Router, useRouterHistory as createHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import routes from './routes';
import store, {updateStoreFromLocalStorage} from './store';
import {setHydrationComplete} from './reducers/hydration';

const renderDynamic = () => {
  const basename = process.env.PUBLICPATH_WITHOUT_SLASH;	
  const historyOptions = basename === '/' ? {} : {basename};	
  const history = createHistory(createBrowserHistory )({historyOptions});

  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const onUpdate = () => window.scrollTo(0, 0); // Scroll to top of page on every transition

  const renderFunc = IS_HOT ? render : hydrate;
  renderFunc(
    <Provider {...{store}}>
      <Router {...{routes, onUpdate, history}}/>
    </Provider>,

    document.getElementById('app'),

    callback,
  );
};

export default renderDynamic;
