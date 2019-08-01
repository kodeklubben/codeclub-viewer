/* global IS_HOT */

import React from 'react';
import {render, hydrate} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import WithStylesContext from './WithStylesContext';
import store, {updateStoreFromLocalStorage} from './store';
import {setHydrationComplete} from './reducers/hydration';

// The following onInsertCss function allows multiple styles as arguments in withStyles().
// If we only require one style, it would suffice with onInsertCss = style => style._insertCss()
const onInsertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => {
    removeCss.forEach(f => f());
  };
};

const renderDynamic = () => {
  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const onUpdate = () => window.scrollTo(0, 0);

  const renderFunc = IS_HOT ? render : hydrate;
  renderFunc(
    <Provider {...{store}}>
      <WithStylesContext {...{onInsertCss}}>
        <Router {...{routes}} history={browserHistory} {...{onUpdate}} />
      </WithStylesContext>
    </Provider>,

    document.getElementById('app'),

    callback,
  );
};

export default renderDynamic;
