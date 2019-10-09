/* eslint-env node */
/* global IS_HOT */

import React from 'react';
import {render, hydrate} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import store, {updateStoreFromLocalStorage} from './store';
import {setHydrationComplete} from './reducers/hydration';
import App from './pages/App';

const renderDynamic = () => {
  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());
    return () => removeCss.forEach(dispose => dispose());
  };

  const renderFunc = IS_HOT ? render : hydrate;
  return renderFunc(
    <Provider {...{store}}>
      <StyleContext.Provider value={{insertCss}}>
        <BrowserRouter>
          <Route path='/'><App/></Route>
        </BrowserRouter>
      </StyleContext.Provider>
    </Provider>,

    document.getElementById('app'),

    callback,
  );
};

export default renderDynamic;
