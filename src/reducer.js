import {combineReducers} from 'redux';
import filter from './reducers/filter';
import isStudentMode from './reducers/mode';
import language from './reducers/language';
import welcomeBox from './reducers/welcomeBox';
import checkboxes from './reducers/checkboxes';
import lastLesson from './reducers/lastLesson';
import filterGroupsCollapsed from './reducers/filterGroupsCollapsed';
import playlists from './reducers/playlists';

export default combineReducers({
  filter,
  isStudentMode,
  language,
  welcomeBox,
  checkboxes,
  lastLesson,
  filterGroupsCollapsed,
  playlists,
});
