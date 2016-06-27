import {combineReducers} from 'redux';
import filter from './filter';
import allCourses from './course';

export default combineReducers({
  allCourses,
  filter
});
