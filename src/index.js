/* global process */

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setContext, setFilter, setLessons} from './action_creators';
import routes from './routes';
import WithStylesContext from './WithStylesContext';
import {getTags, getLessons} from './util';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
const playlistContext = require.context('onlyContent!lessonSrc//', true, /^\.\/[^\/]*\/playlists\/[^\/]*\.txt$/);
const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!README\.md$)[^\/]*\.md/);
const lessons = getLessons(lessonContext);

const initialState = {};
const isProduction = process.env.NODE_ENV === 'production';
let store;

if (isProduction) {
  store = createStore(reducer, initialState);
} else {
  //Only use the DevTools extension when in development
  const devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() :
    f => f;

  store = createStore(reducer, initialState, devTools);
}
store.dispatch(setContext('iconContext', iconContext));
store.dispatch(setContext('playlistContext', playlistContext));
store.dispatch(setLessons(lessons));
store.dispatch(setFilter(getTags(lessonContext)));

render(
  <Provider store={store}>
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
      <Router routes={routes} history={browserHistory}/>
    </WithStylesContext>
  </Provider>,
  document.getElementById('app')
);
