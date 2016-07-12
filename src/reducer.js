import {combineReducers} from 'redux';
import constraintFilter from './reducers/constraintFilter';
import context from './reducers/context';
import filter from './reducers/filter';
import lessons from './reducers/lesson';
import isStudentMode from './reducers/mode';

export default combineReducers({
  constraintFilter,
  lessons,
  context,
  filter,
  isStudentMode
});
