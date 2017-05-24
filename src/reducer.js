import {combineReducers} from 'redux';
import context from './reducers/context';
import filter from './reducers/filter';
import lessons from './reducers/lesson';
import isStudentMode from './reducers/mode';
import language from './reducers/language';

export default combineReducers({
  lessons,
  context,
  filter,
  isStudentMode,
  language
});
