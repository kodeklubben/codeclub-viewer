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

/**
 * Make sure tagItems is an array. Try to convert to array if it is not.
 * This happens if tags is created as string or numbers (e.g. someGroupKey: tag1, tag2, 12345)
 * instead of list (e.g. someGroupKey: [tag1, tag2, 12345]) in YAML
 * @param tagItems
 * @returns {Array}
 */
export const fixNonArrayTagList = (tagItems) => {
  if (tagItems == null) return [];
  if (typeof tagItems === 'string') return tagItems.split(/,\s*/);
  if (!Array.isArray(tagItems) && typeof tagItems !== 'string') return fixNonArrayTagList(tagItems.toString());
  return tagItems;
};

/**
 * Fix invalid tags
 * @param {Object} tags
 * @param {string} src
 * @returns {Object} valid tags
 */
export const cleanseTags = (tags, src) => {
  if (tags == null) return {};

  const filterkeys = getFilterkeys();

  return Object.keys(tags).reduce((result, groupKey) => {
    const groupKeyLC = groupKey.toLowerCase();
    if (!Object.keys(filterkeys).includes(groupKeyLC)) {
      console.warn('Ignoring invalid group ' + groupKey + ' in ' + src);
      return result;
    }

    let tagsInGroup = fixNonArrayTagList(tags[groupKey]).filter( (tagKey) => {
      const isValid = tagKey.length > 0 && filterkeys[groupKeyLC].includes(tagKey.toLowerCase());
      if (!isValid) {
        console.warn('Ignoring invalid tag ' + tagKey + ' in group ' + groupKey + ' in ' + src);
      }
      return isValid;
    });

    if (tagsInGroup.length === 0) { return result; } // Ignore tagGroups with no tagItems

    result[groupKey.toLowerCase()] = tagsInGroup.map(tagKey => tagKey.toLowerCase());
    return result;
  }, {});
};

/**
* Returns languages defined as available
* All available languages must be defined here
* @returns {string[]} An array of available languages, e.g. ['nb', 'nn', 'en']
*/
export const getAvailableLanguages = () => getFilterkeys().language;
