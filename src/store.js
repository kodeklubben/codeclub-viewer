/* eslint-env node */

import {createStore} from 'redux';
import {getLessons, getTags} from './util';
import {setContext, setFilter, setLessons,
   setMode, setLanguage, setWelcomeBox, setCheckboxes} from './action_creators';
import reducer from './reducer';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
const courseContext = require.context('onlyFrontmatter!lessonSrc/', true, /^\.\/[^\/]*\/index\.md/);
const playlistContext = require.context('raw!lessonSrc/', true, /^\.\/[^\/]*\/playlists\/[^\/]*\.txt$/);
const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!README(_[a-z]{2})?\.md$)[^\/]*\.md/);
const readmeContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/README(_[a-z]{2})?\.md$/);
export const lessons = getLessons(lessonContext, readmeContext, courseContext);

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
store.dispatch(setFilter(getTags(lessonContext, courseContext)));

let initialMode = true;
let initialLanguage = 'nb';
let initialWelcomeBox = true;
let initialPath = '/scratch/astrokatt/astrokatt';
let initialCheckboxes = {};

if (typeof localStorage !== 'undefined') {
  if (localStorage.isStudentMode) { initialMode = JSON.parse(localStorage.isStudentMode); }
  if (localStorage.language) { initialLanguage = localStorage.language; }
  if (localStorage.welcomeBox) { initialWelcomeBox = JSON.parse(localStorage.welcomeBox); }
  for (let i in localStorage) {
    if(i !== 'isStudentMode' && i !== 'language' && i !== 'welcomeBox') {
      initialPath = i;
      initialCheckboxes = localStorage.getItem(i);
      //console.log(initialCheckboxes === {}); Dette er false pga stringify i localStorage.js
    }
  }
}
store.dispatch(setMode(initialMode));
store.dispatch(setLanguage(initialLanguage));
store.dispatch(setWelcomeBox(initialWelcomeBox));
store.dispatch(setCheckboxes(initialPath, initialCheckboxes));

export default store;
