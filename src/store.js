import {createStore} from 'redux';
import {createCheckboxesKey} from './utils/checkboxUtils';
import {getInitialFilter} from './utils/filterUtils';
import {getLessonPath, getLessonLanguages} from './resources/lessonFrontmatter';
import {setCheckboxes} from './reducers/checkboxes';
import {setFilter, resetOneFilter} from './reducers/filter';
import {collapseFilterGroup} from './reducers/filterGroupsCollapsed';
import {setLanguage} from './reducers/language';
import {setLastLesson} from './reducers/lastLesson';
import {setShowPlaylists} from './reducers/showPlaylists';
import {setShowDyslexicFont} from './reducers/showDyslexicFont';
import {setExpandedAccordion} from './reducers/expandedAccordion';
import {setShowDarkMode} from './reducers/showDarkMode';
import reducer from './reducer';
import {loadFromLocalStorage} from './utils/localStorage';
import {getCourses} from './resources/courses';
import {getLessonsInCourse} from './resources/lessons';
import {getCoursesWithPlaylists} from './resources/playlists';

const initialState = {};
let store;

const devTools = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :
  f => f;

store = createStore(reducer, initialState, devTools);

const defaultLanguage = 'nb';
const defaultLastLesson = '';
const defaultCheckboxes = {};
const defaultShowPlaylists = false;
const defaultDyslexicFont = false;
const defaultExpandedAccordion = {};
const defaultShowDarkMode = false;

let filter = getInitialFilter(defaultLanguage);
store.dispatch(setFilter(filter));

for (let groupKey of Object.keys(filter)) {
  store.dispatch(collapseFilterGroup(groupKey, true));
}

export const updateStoreFromLocalStorage = () => {
  const initialLanguage = loadFromLocalStorage('language', defaultLanguage);
  const initialLastLesson = loadFromLocalStorage('lastLesson', defaultLastLesson);
  const initialPlaylists = loadFromLocalStorage('showPlaylists', defaultShowPlaylists);
  const initialDyslexicFont = loadFromLocalStorage('showDyslexicFont', defaultDyslexicFont);
  const initialExpandedAccordion = loadFromLocalStorage('expandedAccordion', defaultExpandedAccordion);
  const initialShowDarkMode = loadFromLocalStorage('showDarkMode', defaultShowDarkMode);

  store.dispatch(setLanguage(initialLanguage));
  store.dispatch(setLastLesson(initialLastLesson));
  store.dispatch(setShowPlaylists(initialPlaylists));
  store.dispatch(setShowDyslexicFont(initialDyslexicFont));
  store.dispatch(resetOneFilter('language', initialLanguage));
  store.dispatch(setShowDarkMode(initialShowDarkMode));

  getCoursesWithPlaylists().forEach(playlist => {
    let hasVal = playlist in initialExpandedAccordion;
    store.dispatch(setExpandedAccordion(playlist, hasVal ? initialExpandedAccordion[playlist] : null));
  });

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
