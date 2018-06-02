import {createSelector} from 'reselect';
import {getCourseTags} from '../resources/courseData';
import {getKeysWithTrueValues, tagsMatchFilter} from '../util';
import {getExternalCourses} from '../resources/courseFrontmatter';
import {getFilteredLessons} from './lesson';

const getFilter = (state) => state.filter;

/**
 * Get internal courses that have more than one lesson after filter has been applied.
 * Courses are sorted by number of lessons (most lessons first).
 * @param {object} state The redux state object
 * @returns {string[]} An array of courses
 */
export const getSortedFilteredCourses = createSelector(
  // Input selectors:
  getFilteredLessons,

  // Output selector (resultfunc):
  (filteredLessons) => {
    const filteredCourses = Object.keys(filteredLessons).filter(course => filteredLessons[course].length > 0);
    const sortFunc = (courseA, courseB) => filteredLessons[courseB].length - filteredLessons[courseA].length;
    filteredCourses.sort(sortFunc);
    return filteredCourses;
  }
);

export const getFilteredExternalCourses = createSelector(
  // Input selectors:
  getFilter,

  // Output selector (resultfunc):
  (filter = {}) => {
    const {language, ...rest} = filter;
    const externalCourses = getExternalCourses(getKeysWithTrueValues(language));
    return externalCourses.filter(course => tagsMatchFilter(getCourseTags(course), rest));
  }
);


//
// // Creates a list of courses with lessons that have tags matching the filter
// export const getFilteredCourses = createSelector(
//   [getFilteredAndIndexedLessons],
//   (lessons = {}) => {
//     return Object.keys(lessons).reduce((res, lessonKey) => {
//       const lesson = lessons[lessonKey];
//       const courseName = lesson.course;
//       const name = capitalize(courseName).replace('_', ' ');
//
//       // Increment lessonCount of existing course
//       if (res.hasOwnProperty(courseName)) {res[courseName].lessonCount++;}
//       // Or create a new course
//       else res[courseName] = {
//         iconPath: iconContext('./' + courseName + '/logo-black.png'),
//         lessonCount: 1,
//         name,
//         path: courseName
//       };
//
//       return res;
//     }, {});
//   }
// );
//
// export const getFilteredExternalCourses = createSelector(
//   [getFilter],
//   (filter = {}) => {
//     return courseContext.keys().reduce((res, path) => {
//       const coursePath = path.slice(0, path.indexOf('/', 2));
//       const fm = courseContext(path).frontmatter;
//       const courseMeta = getCourseMetadata(path);
//       if (fm.external != null) {
//         const course = {
//           externalLink: fm.external,
//           iconPath: iconContext(coursePath + '/logo-black.png'),
//           name: fm.title,
//           tags: cleanseTags({...(courseMeta.tags || {}), language: [fm.language]}, 'external course ' + coursePath)
//         };
//         return tagsMatchFilter(course.tags, filter) ? {...res, [fm.title]: course} : res;
//       }
//       return res;
//     }, {});
//   }
// );
