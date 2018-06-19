//import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
// import {getFilteredLessonsInCourse} from '../resources/lessons';
import {createSelector} from 'reselect';
import {getLessonTags, getLessonsInCourse} from '../resources/lessonData';
import {tagsMatchFilter} from '../util';
import {getAllCourses} from '../resources/courseFrontmatter';
import {getLessonLanguages} from '../resources/lessonFrontmatter';


const getFilter = (state) => state.filter; // See structure in INITIAL_STATE in src/reducers/filter.js

/**
 * Get filtered lessons in a course.
 * @param {object} state The redux state object
 * @param {string} course Which course to get lessons for
 * @returns {string[]} An array of filtered lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getFilteredLessonsInCourse = createCachedSelector(
  // Input selectors:
  getFilter,
  (state, course) => course,

  // Output selector (resultfunc):
  (filter, course) => {
    console.debug('DEBUG: selectors/lesson.js:getFilteredLessonsInCourse() for course', course);
    const lessonMatchesFilter = (lesson) => {
      try {
        return tagsMatchFilter(getLessonTags(course, lesson), getLessonLanguages(course, lesson), filter);
      }
      catch (e) {
        console.error(`Error in getFilteredLessonsInCourse() for ${lesson}: ${e.message}`);
        return false; // If error, don't include lesson
      }
    };
    return getLessonsInCourse(course).filter(lessonMatchesFilter);
  },
)(
  // Resolver function (same arguments as for input selectors). Returns selector cache key:
  (state, course) => course
);

/**
 * Get filtered lessons for all courses.
 * @param {object} state The redux state object.
 * @returns {object} An object where the keys are the courses, and the values are arrays of courses, e.g.
 * {
 *   scratch: ['astrokatt', 'straffespark', ...]
 *   python: ['bokstaver', 'fargespill', ...]
 *   ...
 * }
 */
export const getFilteredLessons = createSelector(
  // Input selectors:
  getFilter,

  // Output selector (resultfunc):
  (filter) => {
    console.debug('DEBUG: selectors/lesson.js:getFilteredLessons');
    const filteredLessons = {};
    for (const course of getAllCourses()) {
      // We call getFilteredLessonsInCourse directly (instead of having it
      // as an input selector) because it needs the extra 'course' argument.
      // But we don't want to supply getFilteredLessonsInCourse the whole state,
      // since getFilteredLessons would need to get it through an input selector,
      // and that would make getFilteredLessons recalculate every time anything in
      // the state changes, not only when the filter changes.
      // Instead, we recreate the redux state object with only 'filter' in it,
      // since that is the only part of state that getFilteredLessonsInCourse needs.
      // Note that if the implementation of getFilteredLessonsInCourse changes so that
      // it uses other parts of the state, we will need to supply those, too.
      //
      // An alternative solution would be to separate out the resultfunc of
      // getFilteredLessonsInCourse, and memoize it ourselves in a smart way,
      // and then use this function in both getFilteredLessonsInCourse and getFilteredLessons.
      // If so, we would not need to use reselect nor re-reselect for getFilteredLessonsInCourse.

      const state = {filter}; // Supply all the state that getFilteredLessonsInCourse needs
      filteredLessons[course] = getFilteredLessonsInCourse(state, course);
    }
    return filteredLessons;
  },
);


// // * Only getLessonsByLevel is used (double check). Perhaps simplify?
// // * getCourseLessons doesn't need state, perhaps it doesn't need to be selector?
// // * getLessonData() could take courseName as input, and it could cache result based on parameter (if needed).
// // * If we need to keep this as selector, perhaps use rereselect,
// //   otherwise different courseName will force recalculation.
// // * Now only filter is gotten from state. Perhaps we could precalculate a lot more of lessons,
// //   and just apply filter in the end in a much simpler selector. I.e., can we move a lot of the logic
// //   in this file to a different file? (util.js, or perhaps a separate file)
// // * Update unit tests
//
// export const getCourseLessons = (state, courseName = '') => {
//   const lessons = getLessonData();
//   return Object.keys(lessons).reduce((res, lessonPath) => {
//     return lessonPath.startsWith('./' + courseName) ? {...res, [lessonPath]: lessons[lessonPath]} : res;
//   }, {});
// };
// const getFilter = (state) => state.filter;
//
// /**
//  * Creates an object containing lessons that have tags matching the filter
//  * Input props: courseName (string, optional)
//  */
// export const getFilteredLessons = createSelector(
//   [getFilter, getCourseLessons],
//   (filter = {}, lessons = {}) => {
//
//     return Object.keys(lessons).reduce((res, lessonKey) => {
//       const lesson = lessons[lessonKey];
//       if (tagsMatchFilter(lesson.tags, filter)) res[lessonKey] = lesson;
//       return res;
//     }, {});
//
//   }
// );
//
// /**
//  * Creates an object containing indexed lessons that have tags matching the filter
//  * Input props: courseName (string, optional)
//  */
// export const getFilteredAndIndexedLessons = createSelector(
//   [getFilteredLessons],
//   (filteredLessons = {}) => {
//     return Object.keys(filteredLessons).reduce((res, lessonPath) => {
//       const lesson = filteredLessons[lessonPath];
//       return lesson.indexed ? {...res, [lessonPath]: lesson} : res;
//     }, {});
//   }
// );
//
// /**
//  * Creates an object {<level>: [lessonA, lessonB, ...], ...}
//  * where the lessons available given your current filter are sorted according to level
//  * Input props: courseName (string, optional)
//  */
// export const getLessonsByLevel = createSelector(
//   [getFilteredAndIndexedLessons],
//   (lessons = {}) => {
//     // Get lessons grouped by level
//     return Object.keys(lessons).reduce((res, lessonId) => {
//       const lesson = lessons[lessonId];
//       const level = lesson.level;
//
//       // Ignore lessons without level
//       if (level != null) {
//         if (res.hasOwnProperty(level)) res[level].push(lesson);
//         else res[level] = [lesson];
//       }
//
//       return res;
//     }, {});
//   }
// );
