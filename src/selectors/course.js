import {createSelector} from 'reselect';
import {filterLessons} from '../util';

const getAllCourses = (state) => state.allCourses;
const getFilter = (state) => state.filter;

// Creates a list of courses with lessons that have tags matching the filter
export const getFilteredCourses = createSelector(
  [getFilter, getAllCourses],
  (filter={}, allCourses=[]) => {
    const coursesWithFilteredLessons = allCourses.map(course => ({
      ...course,
      lessons: filterLessons(course.lessons, filter)
    }));

    // Find courses that have at least one lesson that matches filter
    return coursesWithFilteredLessons.filter((course) => {
      return course.lessons.length > 0;
    });
  }
);
