/* eslint-env node */

import {createStore} from 'redux';
import {getLessons, getTags} from './util';
import {setContext, setFilter, setLessons, setMode, setLanguage, setWelcomeBox, setButton} from './action_creators';
import reducer from './reducer';
import {loadLocalStorage} from './localStorage';

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
const local = loadLocalStorage();

/*This is allways 4, even if I localStorage.clear() on chrome.
On Edge this is 1...*/
console.log(local.length);

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
store.dispatch(setFilter(getTags(lessonContext, courseContext)));

/*localStorage*/
if (local.length < 3) {
  console.log('first time');
  store.dispatch(setMode(true));
  store.dispatch(setLanguage('nb'));
  store.dispatch(setWelcomeBox());
}
else {
  console.log('test');
  store.dispatch(setMode(JSON.parse(local.studentMode)));
  store.dispatch(setLanguage(local.lastLanguage));
  //JSON.parse(local.welcomeBox) ? store.dispatch(setWelcomeBox()) : store.dispatch(setButton());
}



export default store;
