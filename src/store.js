/* eslint-env node */

import {createStore} from 'redux';
import {getLessons, getTags} from './util';
import {setContext, setFilter, setLessons, setModeStudent, setLanguage} from './action_creators';
import reducer from './reducer';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
const courseContext = require.context('onlyFrontmatter!lessonSrc/', true, /^\.\/[^\/]*\/index\.md/);
const playlistContext = require.context('raw!lessonSrc/', true, /^\.\/[^\/]*\/playlists\/[^\/]*\.txt$/);
const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!README(_[a-z]{2})?\.md$)[^\/]*\.md/);
const readmeContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/README(_[a-z]{2})?\.md$/);
const lessons = getLessons(lessonContext, readmeContext, courseContext);

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
store.dispatch(setContext('courseContext', courseContext));
store.dispatch(setContext('readmeContext', readmeContext));
store.dispatch(setLessons(lessons));
store.dispatch(setModeStudent());
store.dispatch(setFilter(getTags(lessonContext, courseContext)));
store.dispatch(setLanguage('nb'));

export default store;
