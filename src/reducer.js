import {combineReducers} from 'redux';
import filter from './reducers/filter';
import isStudentMode from './reducers/mode';
import language from './reducers/language';
import checkboxes from './reducers/checkboxes';
import lastLesson from './reducers/lastLesson';
import filterGroupsCollapsed from './reducers/filterGroupsCollapsed';
import showPlaylists from './reducers/showPlaylists';
import showDyslexicFont from './reducers/showDyslexicFont';
import hydration from './reducers/hydration';
import expandedAccordion from './reducers/expandedAccordion';

export default combineReducers({
  filter,
  isStudentMode,
  language,
  checkboxes,
  lastLesson,
  filterGroupsCollapsed,
  showPlaylists,
  showDyslexicFont,
  hydration,
  expandedAccordion,
});
