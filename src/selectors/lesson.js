import createCachedSelector from 're-reselect';
import {createSelector} from 'reselect';
import {getLessonTags, getLessonsInCourse, getLessonLevel} from '../resources/lessonData';
import {languagesMatchFilter, tagsMatchFilter} from '../util';
import {getAllCourses} from '../resources/courseFrontmatter';
import {getLessonLanguages} from '../resources/lessonFrontmatter';
import {isLessonIndexed} from '../resources/lessonData';


/**
 * Get filtered lessons in a course.
 * @param {object} state The redux state object
 * @param {string} course Which course to get lessons for
 * @returns {string[]} An array of filtered lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getFilteredLessonsInCourse = createCachedSelector(
  // Input selectors:
  (state) => state.filter, // See structure in INITIAL_STATE in src/reducers/filter.js
  (state, course) => course,

  // Output selector (resultfunc):
  (filter, course) => {
    const {language:languageFilter, ...tagsFilter} = filter;
    return getLessonsInCourse(course).filter(lesson => {
      try {
        return (
          isLessonIndexed(course, lesson) &&
          languagesMatchFilter(getLessonLanguages(course, lesson), languageFilter) &&
          tagsMatchFilter(getLessonTags(course, lesson), tagsFilter)
        );
      }
      catch (e) {
        console.error(`Error in getFilteredLessonsInCourse() for ${lesson}: ${e.message}`);
        return false; // If error, don't include lesson
      }
    });
  },
)(
  // Resolver function (same arguments as for input selectors). Returns selector cache key:
  (state, course) => course
);

/**
 * Get filtered lessons in a course for a specific level
 * @param {object} state The redux state object
 * @param {string} course Which course to get lessons for
 * @param {number} level Which level to get lessons for
 * @returns {string[]} An array of filtered lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getFilteredLessonsInCourseForLevel = createCachedSelector(
  // Input selectors:
  getFilteredLessonsInCourse,
  (state, course, level) => course,
  (state, course, level) => level,

  // Output selector (resultfunc):
  (lessons, course, level) => lessons.filter(lesson => getLessonLevel(course, lesson) === level),
)(
  (state, course, level) => `${course}_${level}`
);

/**
 * Get levels of filtered lessons in a course.
 * @param {object} state The redux state object
 * @param {string} course Which course to get lessons for
 * @returns {number[]} An array of levels from filtered lessons, sorted, e.g. [1, 2, 3, 4]
 */
export const getFilteredLessonLevelsInCourse = createCachedSelector(
  // Input selectors:
  getFilteredLessonsInCourse,
  (state, course) => course,

  // Output selector (resultfunc):
  (lessons, course) => {
    const levels = new Set;
    for (const lesson of lessons) {
      levels.add(getLessonLevel(course, lesson));
    }
    return [...levels].sort();
  }
)(
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
  (state) => state.filter, // See structure in INITIAL_STATE in src/reducers/filter.js

  // Output selector (resultfunc):
  (filter) => {
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
