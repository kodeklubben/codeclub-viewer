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
 * Creates an object containing lessons that have tags matching the filter
 * where the filter is considered as having all languages selected
 * Only in use to show all available lessons for every language, given the constraints in "tema"
 */
export const getFilteredLessonsLanguagesSelected = createSelector(
  [getFilter, getLessons],
  (filter = {}, lessons = {}) => {

    let languageFilter = {};
    
    for(const groupName of Object.keys(filter)){
      languageFilter[groupName] = {};
      for(const tag of Object.keys(filter[groupName])){
        if(groupName === 'language'){
          languageFilter[groupName][tag] = true;
        }
        else if(filter[groupName][tag]){
          languageFilter[groupName][tag] = true;
        }
        else{
          languageFilter[groupName][tag] = false;
        }
      }
    }

    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      if (tagsMatchFilter(lesson.tags, languageFilter)) res[lessonKey] = lesson;
      return res;
    }, {});

  }
);

/**
 * Creates an object containing indexed lessons that have tags matching the filter
 * where the filter is considered as having all languages selected
 * Only in use to show all available lessons for every language, given the constraints in "tema"
 */
export const getFilteredAndIndexedLessonsLanguagesSelected = createSelector(
  [getFilteredLessonsLanguagesSelected],
  (filteredLessons = {}) => {
    return Object.keys(filteredLessons).reduce((res, lessonPath) => {
      const lesson = filteredLessons[lessonPath];
      return lesson.indexed ? {...res, [lessonPath]: lesson} : res;
    }, {});
  }
);

/**
 * Creates an object containing number of lessons available in each tag given your current filter
 * Input props: courseName (string, optional)
 */
export const getAvailableLessons = createSelector(
  [getFilter, getFilteredAndIndexedLessons, getFilteredAndIndexedLessonsLanguagesSelected],
  (current_filter = {}, filteredLessons = {}, filteredLessonsLanguagesSelected = {}) => {

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
          if(groupName !== 'language' && (lesson.tags[groupName] || []).indexOf(tag)!== -1){
            availableLessons[tag]++;
          }
        });
      });
    });

    Object.keys(filteredLessonsLanguagesSelected).forEach((lessonKey) => {
      const lesson = filteredLessonsLanguagesSelected[lessonKey];
      Object.keys(availableLessons).forEach((tag) => {
        Object.keys(current_filter).forEach((groupName) => {
          if(groupName === 'language' && (lesson.tags[groupName] || []).indexOf(tag)!== -1){
            availableLessons[tag]++;
          }
        });
      });
    });
    return availableLessons;
  }
);


/**
 * Creates an object {<level>: [lessonA, lessonB, ...], ...}
 * where the lessons available given your current filter are sorted according to level
 * Input props: courseName (string, optional)
 */
export const getLessonsByLevel = createSelector(
  [getFilteredAndIndexedLessons],
  (lessons = {}) => {
    // Get lessons grouped by level
    return Object.keys(lessons).reduce((res, lessonId) => {
      const lesson = lessons[lessonId];
      const level = lesson.level;

      // Ignore lessons without level
      if (level != null) {
        if (res.hasOwnProperty(level)) res[level].push(lesson);
        else res[level] = [lesson];
      }

      return res;
    }, {});
  }
);
