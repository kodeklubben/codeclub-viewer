import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';


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
 * Input props: groupKey
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
 * Input props: None
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
