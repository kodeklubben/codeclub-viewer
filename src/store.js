/* eslint-env node */

import {createStore} from 'redux';
import {getLessons, getTags, createCheckboxesKey} from './util';
import {setContext, setFilter, setLessons, setMode, setLanguage, setWelcomeBox,
  setCheckboxes, setLastLesson, collapseFilterGroup} from './action_creators';
import reducer from './reducer';
import {loadFromLocalStorage} from './localStorage';

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

const initialMode = loadFromLocalStorage('isStudentMode', true);
const initialWelcomeBox = loadFromLocalStorage('welcomeBox', true);
const initialLanguage = loadFromLocalStorage('language', 'nb');
const initialLastLesson = loadFromLocalStorage('lastLesson', '');

store.dispatch(setMode(initialMode));
store.dispatch(setWelcomeBox(initialWelcomeBox));
store.dispatch(setLanguage(initialLanguage));
store.dispatch(setLastLesson(initialLastLesson));

let filter = getTags(lessonContext, courseContext);
filter.language[initialLanguage] = true;
store.dispatch(setFilter(filter));

for (let groupKey of Object.keys(filter)) {
  store.dispatch(collapseFilterGroup(groupKey, true));
}

for (let path of Object.keys(lessons)) {
  const checkboxes = loadFromLocalStorage(createCheckboxesKey(path), {});
  if(Object.keys(checkboxes).length !== 0) {
    store.dispatch(setCheckboxes(path, checkboxes));
  }
}

export default store;
