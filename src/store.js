/* eslint-env node */

import {createStore} from 'redux';
import {getInitialFilter, getLessons, createCheckboxesKey} from './util';
import {setFilter, setLessons, setMode, setLanguage, setWelcomeBox,
  setCheckboxes, setLastLesson, collapseFilterGroup} from './action_creators';
import reducer from './reducer';
import {loadFromLocalStorage} from './localStorage';

const lessons = getLessons();

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

store.dispatch(setLessons(lessons));

const initialMode = loadFromLocalStorage('isStudentMode', true);
const initialWelcomeBox = loadFromLocalStorage('welcomeBox', true);
const initialLanguage = loadFromLocalStorage('language', 'nb');
const initialLastLesson = loadFromLocalStorage('lastLesson', '');

store.dispatch(setMode(initialMode));
store.dispatch(setWelcomeBox(initialWelcomeBox));
store.dispatch(setLanguage(initialLanguage));
store.dispatch(setLastLesson(initialLastLesson));

let filter = getInitialFilter(initialLanguage);
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
