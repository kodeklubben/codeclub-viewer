import createCachedSelector from 're-reselect';
import {getLessonPath} from '../resources/lessonFrontmatter';
import {createCheckboxesKey} from '../utils/checkboxUtils';

const getKey = (course, lesson, language, isReadme) => 
  createCheckboxesKey(getLessonPath(course, lesson, language, isReadme));

export const getCheckboxesForLesson = (state, course, lesson, language, isReadme) => {
  const checkboxesKey = getKey(course, lesson, language, isReadme);
  return state.checkboxes[checkboxesKey] || {};
};

/**
 * Returns the number of checkboxes checked for given lesson
 * @param {object} state The redux state object
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {number} Number of checked checkboxes for a lesson
 */
export const getNumberOfCheckedCheckboxes = createCachedSelector(
  // Input selectors:
  getCheckboxesForLesson,

  // Output selector (resultfunc):
  (checkboxesForLesson) => Object.keys(checkboxesForLesson).reduce(
    (sum, hash) => sum + (checkboxesForLesson[hash] ? 1 : 0),
    0
  )
)(
  // Resolver function (same arguments as for input selectors). Returns selector cache key:
  (state, course, lesson, language, isReadme) => getKey(course, lesson, language, isReadme)
);

/**
 * Returns total number of checkboxes for a lesson
 * @param {object} state The redux state object
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {number} Total number of checkboxes for a lesson
 */
export const getTotalNumberOfCheckboxes = createCachedSelector(
  // Input selectors:
  getCheckboxesForLesson,

  // Output selector (resultfunc):
  (checkboxesForLesson) => Object.keys(checkboxesForLesson).length
)(
  // Resolver function (same arguments as for input selectors). Returns selector cache key:
  (state, course, lesson, language, isReadme) => getKey(course, lesson, language, isReadme)
);
