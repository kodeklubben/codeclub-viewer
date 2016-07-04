import {combineReducers} from 'redux';
import context from './reducers/context';
import filter from './reducers/filter';
import lessons from './reducers/lesson';

export default combineReducers({
  lessons,
  context,
  filter
});
