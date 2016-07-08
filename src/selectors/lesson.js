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

// Creates an object containing indexed lessons that have tags matching the filter
export const getFilteredAndIndexedLessons = createSelector(
  [getFilteredLessons],
  (filteredLessons = {}) => {
    return Object.keys(filteredLessons).reduce((res, lessonPath) => {
      const lesson = filteredLessons[lessonPath];
      return lesson.indexed ? {...res, [lessonPath]: lesson} : res;
    }, {});
  }
);
