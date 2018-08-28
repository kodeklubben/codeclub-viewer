/* eslint-env node */

import {createStore} from 'redux';
import {createCheckboxesKey} from './utils/checkboxUtils';
import {getInitialFilter} from './utils/filterUtils';
import {getLessonPath, getLessonLanguages} from './resources/lessonFrontmatter';
import {setCheckboxes} from './reducers/checkboxes';
import {setFilter, resetOneFilter} from './reducers/filter';
import {collapseFilterGroup} from './reducers/filterGroupsCollapsed';
import {setLanguage} from './reducers/language';
import {setLastLesson} from './reducers/lastLesson';
import {setMode} from './reducers/mode';
import {setShowPlaylists} from './reducers/showPlaylists';
import {setShowDyslexicFont} from './reducers/showDyslexicFont';
import reducer from './reducer';
import {loadFromLocalStorage} from './utils/localStorage';
import {getCourses} from './resources/courses';
import {getLessonsInCourse} from './resources/lessons';

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

const defaultMode = true;
const defaultLanguage = 'nb';
const defaultLastLesson = '';
const defaultCheckboxes = {};
const defaultPlaylists = true;
const defaultDyslexicFont = false;

let filter = getInitialFilter(defaultLanguage);
store.dispatch(setFilter(filter));

for (let groupKey of Object.keys(filter)) {
  store.dispatch(collapseFilterGroup(groupKey, true));
}

export const updateStoreFromLocalStorage = () => {
  const initialMode = loadFromLocalStorage('isStudentMode', defaultMode);
  const initialLanguage = loadFromLocalStorage('language', defaultLanguage);
  const initialLastLesson = loadFromLocalStorage('lastLesson', defaultLastLesson);
  const initialPlaylists = loadFromLocalStorage('showPlaylists', defaultPlaylists);
  const initialDyslexicFont = loadFromLocalStorage('showDyslexicFont', defaultDyslexicFont);

  store.dispatch(setMode(initialMode));
  store.dispatch(setLanguage(initialLanguage));
  store.dispatch(setLastLesson(initialLastLesson));
  store.dispatch(setShowPlaylists(initialPlaylists));
  store.dispatch(setShowDyslexicFont(initialDyslexicFont));
  store.dispatch(resetOneFilter('language', initialLanguage));

  for (const course of getCourses()){
    for (const lesson of getLessonsInCourse(course)) {
      for (const language of getLessonLanguages(course, lesson)) {
        const path = getLessonPath(course, lesson, language, false);
        const checkboxes = loadFromLocalStorage(createCheckboxesKey(path), defaultCheckboxes);
        if(Object.keys(checkboxes).length !== 0) {
          store.dispatch(setCheckboxes(path, checkboxes));
        }
      }
    }
  }
};

export default store;
