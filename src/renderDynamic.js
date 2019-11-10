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

const Main = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const basename = process.env.PUBLICPATH_WITHOUT_SLASH;	
  const historyOptions = basename === '/' ? {} : {basename};	
  const history = createHistory(createBrowserHistory )({historyOptions});

  const onUpdate = () => window.scrollTo(0, 0); // Scroll to top of page on every transition

  return (
    <Provider {...{store}}>
      <Router {...{routes, onUpdate, history}}/>
    </Provider>
  );
};

const renderDynamic = () => {
  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const renderFunc = IS_HOT ? render : hydrate;
  renderFunc(<Main/>, document.getElementById('app'), callback);
};

export default renderDynamic;
