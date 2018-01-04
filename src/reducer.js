import {combineReducers} from 'redux';
import context from './reducers/context';
import filter from './reducers/filter';
import lessons from './reducers/lesson';
import isStudentMode from './reducers/mode';
import language from './reducers/language';
import welcomeBox from './reducers/welcomeBox';
import checkboxes from './reducers/checkboxes';
import lastLesson from './reducers/lastLesson';
import filterGroupsCollapsed from './reducers/filterGroupsCollapsed';
import hidesDoneTasks from './reducers/hidesDoneTasks';

export default combineReducers({
  lessons,
  context,
  filter,
  isStudentMode,
  language,
  welcomeBox,
  checkboxes,
  lastLesson,
  filterGroupsCollapsed,
  hidesDoneTasks,
});
