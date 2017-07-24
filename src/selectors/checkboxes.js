import createCachedSelector from 're-reselect';

const getCheckboxesForPath = (state, lessonCheckboxesKey) => state.checkboxes[lessonCheckboxesKey] || {};

/**
 * Returns the number of checkboxes checked for given lesson
 *
 * Input props: lessonCheckboxesKey
 */
export const getNumberOfCheckedCheckboxes = createCachedSelector(

  // input selectors:
  getCheckboxesForPath,

  // resultFunc:
  (checkboxesForPath) => Object.keys(checkboxesForPath).reduce(
    (sum, hash) => sum + (checkboxesForPath[hash] ? 1 : 0),
    0
  )

)(
  (state, lessonCheckboxesKey) => lessonCheckboxesKey
);

/**
 * Returns total number of checkboxes for a lesson
 *
 * Input props: lessonCheckboxesKey
 */
export const getTotalNumberOfCheckboxes = createCachedSelector(

  // input selectors:
  getCheckboxesForPath,

  // resultFunc:
  (checkboxesForPath) => Object.keys(checkboxesForPath).length

)(
  (state, lessonCheckboxesKey) => lessonCheckboxesKey
);
