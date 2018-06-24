import createCachedSelector from 're-reselect';

const getCheckboxesForPath = (state, lessonCheckboxesKey) => state.checkboxes[lessonCheckboxesKey] || {};

/**
 * Returns the number of checkboxes checked for given lesson
 * @param {object} state The redux state object
 * @param {string} lessonCheckboxesKey The key for lesson checkboxes
 * @returns {number} Number of checked checkboxes for a lesson
 */
export const getNumberOfCheckedCheckboxes = createCachedSelector(
  // Input selectors:
  getCheckboxesForPath,

  // Output selector (resultfunc):
  (checkboxesForPath) => Object.keys(checkboxesForPath).reduce(
    (sum, hash) => sum + (checkboxesForPath[hash] ? 1 : 0),
    0
  )
)(
  // Resolver function (same arguments as for input selectors). Returns selector cache key:
  (state, lessonCheckboxesKey) => lessonCheckboxesKey
);

/**
 * Returns total number of checkboxes for a lesson
 * @param {object} state The redux state object
 * @param {string} lessonCheckboxesKey The key for lesson checkboxes
 * @returns {number} Total number of checkboxes for a lesson
 */
export const getTotalNumberOfCheckboxes = createCachedSelector(
  // Input selectors:
  getCheckboxesForPath,

  // Output selector (resultfunc):
  (checkboxesForPath) => Object.keys(checkboxesForPath).length
)(
  // Resolver function (same arguments as for input selectors). Returns selector cache key:
  (state, lessonCheckboxesKey) => lessonCheckboxesKey
);
