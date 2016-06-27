import {combineReducers} from 'redux';
import filter from './reducers/filter';
import allCourses from './reducers/course';

export default combineReducers({
  allCourses,
  filter
});
