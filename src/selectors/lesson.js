import {createSelector} from 'reselect';
import {lessonHasAllTags} from '../util';

const getLessons = (state) => state.lessons;
const getFilter = (state) => state.filter;

// Creates an object containing lessons that have tags matching the filter
export const getFilteredLessons = createSelector(
  [getFilter, getLessons],
  (filter = {}, lessons = {}) => {
    
    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      if (lessonHasAllTags(lesson, filter)) res[lessonKey] = lesson;
      return res;
    }, {});
    
  }
);
