import createCachedSelector from 're-reselect';
import {createSelector} from 'reselect';
import {getLessonTags, getLessonsInCourse, getLevel, isLessonIndexed} from '../resources/lessons';
import {languagesMatchFilter, tagsMatchFilter} from '../utils/filterUtils';
import {getCourses} from '../resources/courses';
import {getLessonLanguages} from '../resources/lessonFrontmatter';
import {getCheckedFilterLanguages, getTagsFilter} from './filter';

/**
 * Get filtered lessons for all (internal) courses.
 * Courses are sorted alphabetically.
 * Lessons are sorted alphabetically within each course.
 * Courses with no lessons (i.e. "empty courses") are not returned.
 * @param {object} state The redux state object.
 * @returns {object} An object where the keys are the courses, and the values are arrays of courses, e.g.
 * {
 *   python: ['bokstaver', 'fargespill', ...]
 *   scratch: ['astrokatt', 'straffespark', ...]
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
      const lessons = getLessonsInCourse(course).filter(lesson => {
        try {
          return (
            isLessonIndexed(course, lesson) &&
            languagesMatchFilter(getLessonLanguages(course, lesson), languageFilter) &&
            tagsMatchFilter(getLessonTags(course, lesson), tagsFilter)
          );
        }
        catch (e) {
          console.error(`ERROR --- Skipping ${lesson} due to error: ${e.message}`);
          return false; // If error, don't include lesson
        }
      });
      if (lessons.length > 0) {
        filteredLessons[course] = lessons;
      }
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
 * Get number of lessons per checked language for all courses.
 * Doesn't return courses or languages without lessons.
 * @param {object} state The redux state object
 * @returns {object} An object which shows how many lessons per checked filter language, e.g.
 * {
 *   scratch: {
 *     nb: 5,
 *     en: 2,
 *   },
 *   python: {
 *     nb: 7,
 *     nn: 4,
 *   },
 *   ...
 * }
 */
export const getFilteredLessonCountPerLanguage = createSelector(
  // Input selectors:
  getFilteredLessons,
  getCheckedFilterLanguages,

  // Output selector (resultfunc):
  (lessons, filterLanguages) => {
    const resultObj = {};
    for (const course of Object.keys(lessons)) {
      const lessonsInCourse = lessons[course];
      for (const lesson of lessonsInCourse) {
        for (const language of getLessonLanguages(course, lesson)) {
          if (filterLanguages.includes(language)) {
            const courseObj = resultObj[course] || {};
            courseObj[language] = (courseObj[language] || 0) + 1;
            resultObj[course] = courseObj;
          }
        }
      }
    }
    return resultObj;
  }
);

/**
 * Get number of lessons (in a course) per checked language. Doesn't return languages without lessons.
 * @param {object} state The redux state object
 * @param {string} course Which course to count lessons for
 * @returns {object} An object which shows how many lessons per checked filter language, e.g.
 * {
 *   nb: 5,
 *   en: 2,
 * }
 */
export const getFilteredLessonsInCourseCountPerLanguage = (state, course) =>
  getFilteredLessonCountPerLanguage(state)[course] || [];

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
