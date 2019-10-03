/* global IS_HOT */

import React from 'react';
import {render, hydrate} from 'react-dom';
import {Router, browserHistory} from 'react-router';
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
  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const renderFunc = IS_HOT ? render : hydrate;
  renderFunc(
    <Provider {...{store}}>
      <StyleContext.Provider value={{insertCss}}>
        <Router {...{routes}} history={browserHistory} onUpdate={() => window.scrollTo(0, 0)} />
      </StyleContext.Provider>
    </Provider>,

    document.getElementById('app'),

    callback,
  );
};

export default renderDynamic;
