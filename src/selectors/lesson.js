import {createSelector} from 'reselect';
import {tagsMatchFilter} from '../util';

const getLessons = (state, courseName = '') => {
  return Object.keys(state.lessons).reduce((res, lessonPath) => {
    return lessonPath.startsWith('./' + courseName) ? {...res, [lessonPath]: state.lessons[lessonPath]} : res;
  }, {});
};
const getFilter = (state) => state.filter;

/**
 * Creates an object containing lessons that have tags matching the filter
 * Input props: courseName (string, optional)
 */
export const getFilteredLessons = createSelector(
  [getFilter, getLessons],
  (filter = {}, lessons = {}) => {

    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      if (tagsMatchFilter(lesson.tags, filter)) res[lessonKey] = lesson;
      return res;
    }, {});

  }
);

/**
 * Creates an object containing indexed lessons that have tags matching the filter
 * Input props: courseName (string, optional)
 */
export const getFilteredAndIndexedLessons = createSelector(
  [getFilteredLessons],
  (filteredLessons = {}) => {
    return Object.keys(filteredLessons).reduce((res, lessonPath) => {
      const lesson = filteredLessons[lessonPath];
      return lesson.indexed ? {...res, [lessonPath]: lesson} : res;
    }, {});
  }
);

/**
 * Creates an object containing number of lessons available in each tag given your current filter
 */

export const getAvailableLessons = createSelector(
  [getFilter, getFilteredLessons],
  (current_filter = {}, filteredLessons = {}) => {

    let availableLessons = {};

    Object.keys(current_filter).forEach( groupName => {
      const group = current_filter[groupName];
      Object.keys(group).forEach( tagItem => {
        availableLessons[tagItem] = 0;
      });
    });

    Object.keys(filteredLessons).forEach((lessonKey) => {
      const lesson = filteredLessons[lessonKey];
      Object.keys(availableLessons).forEach((tag) => {
        Object.keys(current_filter).forEach((groupName) => {
          if((lesson.tags[groupName] || []).indexOf(tag)!== -1){
            availableLessons[tag]++;
          }
        });
      });
    });

    return availableLessons;
  }
);
