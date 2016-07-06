import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import WithStylesContext from './WithStylesContext';

import store from './store';

render(
  <Provider store={store}>
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
      <Router routes={routes} onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}/>
    </WithStylesContext>
  </Provider>,
  document.getElementById('app')
);
