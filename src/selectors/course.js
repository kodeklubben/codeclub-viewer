import {createSelector} from 'reselect';
import {filterLessons} from '../util';

const getAllCourses = (state) => state.allCourses;
const getFilter = (state) => state.filter;

export const getFilteredCourses = createSelector(
  [getFilter, getAllCourses],
  (filter={}, allCourses=[]) => {
    const coursesWithFilteredLessons = allCourses.map(course => {
      const newCourse = {...course};
      newCourse.lessons = filterLessons(course.lessons, filter);
      return newCourse;
    });

    // Find courses that have at least one lesson that matches filter
    return coursesWithFilteredLessons.filter((course) => {
      return course.lessons.length > 0;
    });
    // return filterCourses(allCourses, filter);
  }
);
