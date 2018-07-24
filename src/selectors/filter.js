import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';


/**
 * Uncached function that returns false if
 *   the filter group is 'language' and exactly one item is checked, or
 *   the filter group is not 'language' and exactly zero items are checked.
 * Returns true otherwise.
 * @param {object} filter See structure of INITIAL_STATE in src/reducers/filter.js
 * @param {string} language E.g. 'nb'
 * @param {string} groupKey E.g. 'language', 'topic', 'subject', or 'grade'
 * @returns {boolean}
 */
const isSomethingCheckedInGroup = (filter = {}, language, groupKey) => {
  if (!filter.hasOwnProperty(groupKey)) {
    return false;
  }
  const group = filter[groupKey];
  const numberChecked = Object.keys(group).reduce((result, tagKey) => result + (group[tagKey] ? 1 : 0), 0);
  const isLanguage = groupKey === 'language';
  const nothingChecked = (!isLanguage && numberChecked === 0) ||
    (isLanguage && group[language] && numberChecked === 1);

  return !nothingChecked;
};

/**
 * Cached (selector) function returning isSomethingCheckedInGroup (see description for this function).
 * The answer is cached per groupKey.
 * @param {object} state The redux state object
 * @param {string} groupKey E.g. 'language', 'topic', 'subject', or 'grade'
 * @returns {boolean}
 */
export const somethingCheckedInGroup = createCachedSelector(
  (state) => state.filter,
  (state) => state.language,
  (state, groupKey) => groupKey,
  isSomethingCheckedInGroup
)(
  (state, groupKey) => groupKey
);

/**
 * Cached (selector) function that returns false if
 *   the filter group 'language' has exactly one item checked, and
 *   all filter groups that are not 'language' has exactly zero items checked.
 * Returns true otherwise.
 * @param {object} state The redux state object
 * @returns {boolean}
 */
export const somethingCheckedInFilter = createSelector(
  (state) => state.filter,
  (state) => state.language,
  (filter = {}, language) => {
    for (let groupKey of Object.keys(filter)) {
      if (isSomethingCheckedInGroup(filter, language, groupKey)) {
        return true;
      }
    }
    return false;
  }
);

/**
 * Get all languages checked in filter.
 * @param {object} state The redux state object
 * @returns {string[]} Array of languages checked in filter, e.g. ['nn', 'en']
 */
export const getCheckedFilterLanguages = createSelector(
  (state) => state.filter.language,
  (languageFilter) => Object.keys(languageFilter).filter(language => languageFilter[language]),
);

/**
 * Whether or not to show a flag in the lesson items in the playlist
 * @param {object} state The redux state object
 * @returns {boolean}
 */
export const onlyCheckedMainLanguage = createSelector(
  // Input selectors:
  getCheckedFilterLanguages,
  (state) => state.language, // Chosen main language

  // Output selector (resultfunc):
  (checkedFilterLanguages, language) => {
    const checkedExactlyOneLanguage = checkedFilterLanguages.length === 1;
    return checkedExactlyOneLanguage && checkedFilterLanguages[0] === language;
  }
);

/**
 * Get the filter without language.
 * @param {object} state The redux state object
 * @returns {object} Filter without language. See INITIAL_STATE in reducers/filter.js for structure.
 */
export const getTagsFilter = createSelector(
  // Input selectors:
  (state) => state.filter,

  // Output selector (resultfunc):
  (filter) => {
    const tagsFilter = {...filter}; // shallow clone
    delete tagsFilter.language;
    return tagsFilter;
  }
);
