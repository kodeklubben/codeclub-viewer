import {createSelector} from 'reselect';
import {tagsMatchFilter, getOrTaggedGroups} from '../util';

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
 * where the filter is considered as having all OR-tags selected
 */
export const getFilteredLessonsOrTagsSelected = createSelector(
  [getFilter, getLessons],
  (filter = {}, lessons = {}) => {
    //const orTaggedGroups = getOrTaggedGroups();
    let orTaggedFilter = {};

    for(const groupKey of Object.keys(filter)){
      orTaggedFilter[groupKey] = {};
      for(const tagKey of Object.keys(filter[groupKey])){
        //if(orTaggedGroups.indexOf(groupKey) !== -1){
        if(groupKey === 'language'){
          orTaggedFilter[groupKey][tagKey] = true;
        }else{
          orTaggedFilter[groupKey][tagKey] = !!filter[groupKey][tagKey];
        }
      }
    }

    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      if (tagsMatchFilter(lesson.tags, orTaggedFilter)) {
        res[lessonKey] = lesson;
      }
      return res;
    }, {});
  }
);

/**
 * Creates an object containing indexed lessons that have tags matching the filter
 * where the filter is considered as having all OR-tags selected
 */
export const getFilteredAndIndexedLessonsOrTagsSelected = createSelector(
  [getFilteredLessonsOrTagsSelected],
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
  [getFilter, getFilteredAndIndexedLessons, getFilteredAndIndexedLessonsOrTagsSelected],
  (current_filter = {}, filteredLessons = {}, filteredLessonsOrTagsSelected = {}) => {

    const OrTaggedGroups = getOrTaggedGroups();
    let availableLessons = {};

    Object.keys(current_filter).forEach(groupKey => {
      const group = current_filter[groupKey];
      Object.keys(group).forEach(tagKey => {
        availableLessons[tagKey] = 0;
      });
    });

    Object.keys(filteredLessons).forEach((lessonKey) => {
      const lesson = filteredLessons[lessonKey];
      Object.keys(availableLessons).forEach(tag => {
        Object.keys(current_filter).forEach(groupKey => {
          if(OrTaggedGroups.indexOf(groupKey) === -1 && (lesson.tags[groupKey] || []).indexOf(tag) !== -1) {
            availableLessons[tag]++;
          }
        });
      });
    });

    Object.keys(filteredLessonsOrTagsSelected).forEach((lessonKey) => {
      const lesson = filteredLessonsOrTagsSelected[lessonKey];
      Object.keys(availableLessons).forEach(tag => {
        Object.keys(current_filter).forEach(groupKey => {
          if (OrTaggedGroups.indexOf(groupKey) !== -1 && (lesson.tags[groupKey] || []).indexOf(tag) !== -1) {
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
