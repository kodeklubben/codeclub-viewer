/* eslint-env node */

/**
 * Makes first character in str upper case
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

/**
 * Returns the filename, like the unix equivalent and path.dirname. Trailing slashes are ignored.
 * @param {string} path any path
 * @returns {string} the whole path, except the filename
 */
export const basename = (path) => {
  if (path === '') { return ''; }
  const b = path.match(/.*\/([^/]+)\/*$/);
  return b == null ? path : b[1];
};

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
 * Converts and array to object, where the array values becomes the object keys, and the values are 'false'.
 * @param array
 * @returns {object}
 */
export const arrayToObject = (array) => {
  return array.reduce((res, key) => {
    res[key] = false;
    return res;
  }, {});
};

/**
 * Return the keys of an object whose values are true (or true-ish),
 * i.e. if obj={hat: true, cat: false, dog: false, log: true}, the function will return [hat, log]
 * @param {object} obj
 * @returns {string[]} An array of the keys that have true-ish values
 */
export const getKeysWithTrueValues = (obj) => Object.keys(obj).filter(key => obj[key]);

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
* Returns languages defined as available
* All available languages must be defined here
* @returns {string[]} An array of available languages, e.g. ['nb', 'nn', 'en']
*/
export const getAvailableLanguages = () => getFilterkeys().language;

/**
 * Based on an implementation of Java's string to integer hashCode function.
 * See e.g. https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 * @param {string} str Any string you wish to hash
 * @returns {number} e.g. 1395333309
 */
export const hashCode = (str) => {
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
  }
  return Math.abs(hash);
};

/**
 * Get a string used to store checkboxes in localstorage
 * @param {string} path e.g. './path/to/file.md' or '/path/to/file' or 'path/to/file.md'
 * @returns {string} e.g. 'checkboxes_path/to/file'
 */
export const createCheckboxesKey = (path = 'undefined') => {
  path = path.match(/^\.?\/?(.*?)(?:\.md)?$/)[1]; // Remove . or / or ./ from beginning and .md from end
  return 'checkboxes_' + path;
};

/**
 * Finds every checkbox in the lesson and updates the state of it.
 * @param {string} path path for the lesson
 * @param {object} checkboxes checkbox object in state
 * @param {function} setCheckbox function for updating the state and localstorage
 */
export const setCheckboxes = (path, checkboxes, setCheckbox) => {
  const labels = [...document.getElementsByTagName('label')];
  for (let label of labels) {
    const input = document.getElementById(label.htmlFor);
    if (input && input.type === 'checkbox') {
      let hash = hashCode(label.textContent);
      input.checked = !!checkboxes[hash];
      setCheckbox(path, hash, !!checkboxes[hash]);
      input.onclick = (e) => {
        setCheckbox(path, hash, !!e.target.checked);
      };
    }
  }
};

/**
 * Checks every checkbox and see if it's checked or not
 * @param {object} checkboxes checkbox object in state
 * @returns {boolean}
 */
export const anyCheckboxTrue = (checkboxes) => {
  for (let i of Object.keys(checkboxes)) {
    if (checkboxes[i] === true) {
      return true;
    }
  }
  return false;
};
