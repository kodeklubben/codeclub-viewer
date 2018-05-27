// import {createSelector} from 'reselect';
// import {tagsMatchFilter} from '../util';
// import {getLessonData} from '../contextUtils';
//
// // TODO:
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
