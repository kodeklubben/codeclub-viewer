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
    let availableAndroidLessons = 0;

    let availableLessons = Object.keys(current_filter.operativsystem).map((tag, bool) => {
      let rObj = {};
      rObj[tag] = 0;
      return rObj;
    });

    Object.keys(filteredLessons).reduce((sum, lessonKey) => {
      const lesson = filteredLessons[lessonKey];
      for (let tagObject in availableLessons){
        for (let tag in availableLessons[tagObject]){
          if ((lesson.tags.operativsystem || []).indexOf(tag)!== -1){
            availableLessons[tagObject][tag]++;
          }
        }
      }
    }, 0);

    console.log(availableLessons);

    return availableAndroidLessons;

  }
);
