import createCachedSelector from 're-reselect';
import {createSelector} from 'reselect';
import {getLessonTags, getLessonsInCourse, getLevel, isLessonIndexed} from '../resources/lessons';
import {languagesMatchFilter, tagsMatchFilter} from '../util';
import {getCourses} from '../resources/courses';
import {getLessonLanguages} from '../resources/lessonFrontmatter';
import {getCheckedFilterLanguages, getTagsFilter} from './filter';

/**
 * Get filtered lessons for all (internal) courses.
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
  state => state.filter.language,
  getTagsFilter,

  // Output selector (resultfunc):
  (languageFilter, tagsFilter) => {
    const filteredLessons = {};
    for (const course of getCourses()) {
      filteredLessons[course] = getLessonsInCourse(course).filter(lesson => {
        try {
          return (
            isLessonIndexed(course, lesson) &&
            languagesMatchFilter(getLessonLanguages(course, lesson), languageFilter) &&
            tagsMatchFilter(getLessonTags(course, lesson), tagsFilter)
          );
        }
        catch (e) {
          console.error(`Error in getFilteredLessons() for ${lesson}: ${e.message}`);
          return false; // If error, don't include lesson
        }
      });
    }
    return filteredLessons;
  }
);

/**
 * Get filtered lessons in a course.
 * @param {object} state The redux state object
 * @param {string} course Which course to get lessons for
 * @returns {string[]} An array of filtered lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getFilteredLessonsInCourse = (state, course) => getFilteredLessons(state)[course] || [];

/**
 * Get number of lessons (in a course) per checked language.
 * @param {object} state The redux state object
 * @param {string} course Which course to count lessons for
 * @returns {object} An object which shows how many lessons per language, e.g.
 * {
 *   nb: 5,
 *   en: 2,
 */
export const getFilteredLessonsInCourseCountPerLanguage = createSelector(
  // Input selectors:
  (state, course) => course,
  getFilteredLessonsInCourse,
  getCheckedFilterLanguages,

  // Output selector (resultfunc):
  (course, lessons, filterLanguages) => {
    const lessonsPerLanguage = {};
    for (const lesson of lessons) {
      for (const language of getLessonLanguages(course, lesson)) {
        if (filterLanguages.includes(language)) {
          lessonsPerLanguage[language] = (lessonsPerLanguage[language] || 0) + 1;
        }
      }
    }
    return lessonsPerLanguage;
  }
);


/**
 * Get filtered lessons in a course for a specific level
 * @param {object} state The redux state object
 * @param {string} course Which course to get lessons for, e.g. 'scratch'
 * @param {number} level Which level to get lessons for, e.g. '2'
 * @returns {string[]} An array of filtered lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getFilteredLessonsInCourseForLevel = createCachedSelector(
  // Input selectors:
  getFilteredLessonsInCourse,
  (state, course) => course,
  (state, course, level) => level,

  // Output selector (resultfunc):
  (lessons, course, level) => lessons.filter(lesson => getLevel(course, lesson) === level),
)(
  (state, course, level) => `${course}_${level}`
);

/**
 * Get levels of filtered lessons in a course.
 * @param {object} state The redux state object
 * @param {string} course Which course to get lessons for, e.g. 'scratch'
 * @returns {number[]} An array of levels from filtered lessons, sorted, e.g. [1, 2, 3, 4]
 */
export const getFilteredLevelsInCourse = createCachedSelector(
  // Input selectors:
  getFilteredLessonsInCourse,
  (state, course) => course,

  // Output selector (resultfunc):
  (lessons, course) => {
    const levels = new Set;
    for (const lesson of lessons) {
      levels.add(getLevel(course, lesson));
    }
    return [...levels].sort();
  }
)(
  (state, course) => course
);
