import {createSelector} from 'reselect';
import {getCourseTags} from '../resources/courseData';
import {getKeysWithTrueValues, tagsMatchFilter} from '../util';
import {getExternalCourses} from '../resources/courseFrontmatter';
import {getAllCourses} from '../resources/courseFrontmatter';
import {getFilteredLessonsInCourse} from './lesson';

const getFilter = (state) => state.filter;

/**
 * Get internal courses that have more than one lesson after filter has been applied.
 * Courses are sorted by number of lessons (most lessons first).
 * @param {object} state The redux state object
 * @returns {string[]} An array of courses
 */
export const getSortedFilteredCourses = createSelector(
  // Input selectors:
  getFilter,

  // Output selector (resultfunc):
  (filter = {}) => {
    const courses = getAllCourses();
    const lessonCounts = {};
    for (const course in courses) {
      // We want to call getFilteredLessonsInCourse directly (instead of having it
      // as an input selector) because it needs the extra 'course' argument.
      // But we don't want to supply it the whole state, since we would need to get
      // it through an input selector, and that would make getSortedFilteredCourses to
      // recalculate every time anything in the state changes.
      // Instead, we create a state with only filter in it, since that is the only part
      // of state that getFilteredLessonsInCourse needs.
      // NOTE: If the implementation of getFilteredLessonsInCourse changes so that
      //       it uses other parts of the state, we will need to supply that, too.
      const state = {filter};
      lessonCounts[course] = getFilteredLessonsInCourse(state, course).length;
    }
    const filteredCourses = courses.filter(course => lessonCounts[course] > 0);
    const sortFunc = (courseA, courseB) => lessonCounts[courseB] - lessonCounts[courseA];
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
