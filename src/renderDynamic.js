/* eslint-env node */
/* eslint react-hooks/rules-of-hooks: 0 */
/* global IS_HOT */

import React from 'react';
import {render, hydrate} from 'react-dom';
import {Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import routes from './routes';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import store, {updateStoreFromLocalStorage} from './store';
import {setHydrationComplete} from './reducers/hydration';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

const renderDynamic = () => {
  const basename = process.env.PUBLICPATH_WITHOUT_SLASH;	
  const historyOptions = basename === '/' ? {} : {basename};	
  const history = useRouterHistory(createBrowserHistory )({historyOptions});

  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const onUpdate = () => window.scrollTo(0, 0); // Scroll to top of page on every transition

  const renderFunc = IS_HOT ? render : hydrate;
  renderFunc(
    <Provider {...{store}}>
      <StyleContext.Provider value={{insertCss}}>
        <Router {...{routes, onUpdate, history}}/>
      </StyleContext.Provider>
    </Provider>,

    document.getElementById('app'),

    callback,
  );
};

export default renderDynamic;
