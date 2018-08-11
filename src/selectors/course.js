import {createSelector} from 'reselect';
import {getCourseTags, getExternalCourses} from '../resources/courses';
import {tagsMatchFilter} from '../utils/filterUtils';
import {getCourseLanguages} from '../resources/courseFrontmatter';
import {getFilteredLessonCountPerLanguage} from './lesson';
import {getTagsFilter} from './filter';

/**
 * Get internal courses that have more than one lesson after filter has been applied.
 * Courses are sorted by number of lessons (most lessons first).
 * @param {object} state The redux state object
 * @returns {string[]} An array of courses, e.g. ['scratch', 'python', ...]
 */
export const getFilteredCourses = createSelector(
  // Input selectors:
  getFilteredLessonCountPerLanguage,

  // Output selector (resultfunc):
  (filteredLessonCount) => {
    const courseCount = {};
    const filteredCourses = Object.keys(filteredLessonCount);
    for (const course of filteredCourses) {
      const courseObj = filteredLessonCount[course];
      courseCount[course] = Object.keys(courseObj).reduce((sum, n) => sum + courseObj[n], 0);
    }
    const sortFunc = (courseA, courseB) => courseCount[courseB] - courseCount[courseA];
    filteredCourses.sort(sortFunc);
    return filteredCourses;
  }
);

/**
 * Get a list of external courses, filtered by tags. Sorted alphabetically.
 * Returns only courses that contain all the checked tags in the filter.
 * @param {object} state The redux state object
 * @type {string[]} An array of external courses, e.g. ['codecademy', 'kodegenet', ...]
 */
export const getTagFilteredExternalCourses = createSelector(
  // Input selectors:
  getTagsFilter,

  // Output selector (resultfunc):
  (tagsFilter) => {
    return getExternalCourses().filter(course => {
      try {
        return tagsMatchFilter(getCourseTags(course), tagsFilter);
      }
      catch (e) {
        console.error(`Error in getFilteredExternalCourses for ${course}: ${e.message}`);
        return false; // Don't include a course that has errors
      }
    });
  }
);

/**
 * Returns a filtered list of {course,language} objects of external courses.
 * Only the tuples that match both tag and language filter are returned.
 * Sorted alphabetically by course, and within course, alphabetically by language code.
 * @param {object} state The redux state object
 * @returns {object[]} An array of objects, e.g.
 * [
 *   {course: 'khan_academy', language: 'en'},
 *   {course: 'khan_academy', language: 'nb'},
 *   {course: 'kodegenet', language: 'nb'},
 *   ...
 * ]
 */
export const getFilteredExternalCoursesWithLanguages = createSelector(
  // Input selectors:
  getTagFilteredExternalCourses,
  (state) => state.filter.language,

  // Output selector (resultfunc):
  (courses, languageFilter = {}) => {
    const coursesWithLanguages = [];
    for (const course of courses) {
      const courseLanguages = getCourseLanguages(course).sort();
      for (const language of courseLanguages) {
        if (languageFilter[language]) {
          coursesWithLanguages.push({course, language});
        }
      }
    }
    return coursesWithLanguages;
  }
);
