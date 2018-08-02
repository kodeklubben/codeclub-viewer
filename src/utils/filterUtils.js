import {arrayToObject, getKeysWithTrueValues} from './util';

/**
 * Returns all valid filter groupKeys and tagKeys, converted to lowercase.
 * @returns {object}: {
 *     groupKey1: [tagKey1, tagKey2, ...],
 *     groupKey2: [tagKey1, tagKey2, ...],
 *  }
 */
export const getFilterkeys = () => {
  const filterkeys = require('lessonFiltertags/keys.yml');
  return Object.keys(filterkeys).reduce((result, groupKey) => {
    result[groupKey.toLowerCase()] = filterkeys[groupKey].map(tagKey => tagKey.toLowerCase());
    return result;
  }, {});
};

/**
 * Returns filterkeys, but where each group is a Map instead of an array.
 * If a valid initialLanguage is given, set it to true/checked.
 * Note that we use Map instead of object for each group to ensure correct ordering of tags.
 * @param {string} initialLanguage
 * @returns {object}: {
 *     groupKey1: Map({ tagKey1: false, tagKey2: false, ...}),
 *     groupKey2: Map({ tagKey1: false, tagKey2: false, ...}),
 *     ...
 *   }
 */
export const getInitialFilter = (initialLanguage) => {
  const filterkeys = getFilterkeys();
  const filter = Object.keys(filterkeys).reduce( (result, groupKey) => {
    result[groupKey] = arrayToObject(filterkeys[groupKey]);
    return result;
  }, new Map()); // Use Map instead of Object to ensure correct order of tags
  if ((filterkeys.language || []).includes(initialLanguage)) {
    filter.language[initialLanguage] = true;
  }
  return filter;
};

/**
 * Return true only if tags of a lesson or course contains all the checked tags in the filter
 * @param {Object} lessonTags LessonTags or courseTags e.g. {topic: ['game'], subject: ['science']}
 * @param {Object} tagsFilter e.g. {topic: {game: false, robot: true}, subject: {mathematics: false, english: true}}}
 * @returns {boolean}
 */
export const tagsMatchFilter = (lessonTags, tagsFilter) => {
  if (!lessonTags) {
    throw Error('lessonTags not defined');
  }
  const groupKeys = Object.keys(tagsFilter); // groupKeys is e.g. ['topic', 'subject']
  for (let groupKey of groupKeys) { // groupKey is e.g. 'topic'
    const filterGroup = tagsFilter[groupKey]; // the whole filter group, e.g. {game: false, robot: true}
    const checkedTagKeys = getKeysWithTrueValues(filterGroup); // only the checked tags; e.g. ['robot']
    const lessonGroup = lessonTags[groupKey] || []; // e.g. ['game']
    if (checkedTagKeys.length > 0 && lessonGroup.length === 0) {
      // this is a filter with checked tags, and lesson doesn't have this group
      return false;
    }
    // meaning: Include lesson ONLY if it has tags matching ALL checked tags in filter (AND-test / intersection)
    const lessonGroupHasAllCheckedTags = checkedTagKeys.every(checkedTagKey => lessonGroup.includes(checkedTagKey));
    if (!lessonGroupHasAllCheckedTags) {
      return false;
    }
  }
  return true;
};

/**
 * Return true if lessonLanguages includes at least one checked language (union / OR-test)
 * @param {string[]} lessonLanguages Array of lesson languages e.g. ['nb', 'en']
 * @param {Object} languageFilter e.g. {en: false, nb: true, nn: false}
 * @returns {boolean}
 */
export const languagesMatchFilter = (lessonLanguages, languageFilter) => {
  if (!Array.isArray(lessonLanguages) || lessonLanguages.length === 0) {
    throw Error('lesson does not exist in any language');
  }
  const checkedLanguages = getKeysWithTrueValues(languageFilter); // only the checked tags; e.g. ['nb']
  return checkedLanguages.some(checkedTagKey => lessonLanguages.includes(checkedTagKey));
};
