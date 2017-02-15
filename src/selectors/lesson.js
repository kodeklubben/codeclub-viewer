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

export const getAvailableLessons = createSelector(
  [getFilter, getFilteredLessons],
  (current_filter = {}, filteredLessons = {}) => {

    let availableLessons = {};
    for (let tag in current_filter.operativsystem) {
      availableLessons[tag] = 0;
    }
    for (let tag in current_filter.tema) {
      availableLessons[tag] = 0;
    }

    Object.keys(filteredLessons).reduce((sum, lessonKey) => {
      const lesson = filteredLessons[lessonKey];
      for (let tag in availableLessons){
        if ((lesson.tags.operativsystem || []).indexOf(tag)!== -1){
          availableLessons[tag]++;
        }
        if ((lesson.tags.tema || []).indexOf(tag)!== -1){
          availableLessons[tag]++;
        }
      }
    }, 0);

    console.log(availableLessons);

    return availableLessons;

  }
);
