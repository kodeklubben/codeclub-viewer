import {createSelector} from 'reselect';
import {filterCourses} from '../util';

const getAllCourses = (state) => state.allCourses;
const getFilter = (state) => state.filter;

export const getFilteredCourses = createSelector(
  [getFilter, getAllCourses],
  (filter={}, allCourses=[]) => {
    return filterCourses(allCourses, filter);
  }
);
