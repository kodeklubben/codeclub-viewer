/* eslint-env node */

/**
 * Makes first character in str upper case
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * Returns the filename, like the unix equivalent and path.dirname. Trailing slashes are ignored.
 * @path {string} any path
 * @returns {string} the whole path, except the filename
 */
export function basename(path) {
  if (path === '') { return ''; }
  const b = path.match(/.*\/([^/]+)\/*$/);
  return b == null ? path : b[1];
}

/**
 * Returns the path except the filename, like the unix equivalent and path.basename. Trailing slashes are ignored.
 * @path {string} any path
 * @returns {string} only the filename
 */
export function dirname(path) {
  if (path.match(/^\/+$/)) { return '/'; }
  const b = path.match(/(.*)\/[^/]+\/*$/);
  return b == null ? '.' : (b[1] === '' ? '/' : b[1]);
}

/**
 * Removes duplicates from an array
 * @param {array} array An array with potentially duplicate elements
 * @returns {array} An array with unique elements
 */
export const removeDuplicates = (array) => [...new Set(array)];

/** Assigns value to a nested object, even if the subobjects don't exist.
 *  I.e. assignDeep(obj, [1,2,3], 9) where obj={}, makes obj[1][2][3] === 9
 * @param {object} obj
 * @param {array} keys
 * @param {*} value
 */
export const assignDeep = (obj, keys, value) => {
  if (keys.length === 0) { return; }
  const [key, ...rest] = keys;
  if (rest.length === 0) {
    obj[key] = value;
  } else {
    if (!obj[key]) { obj[key] = {}; }
    assignDeep(obj[key], rest, value);
  }
};

/**
 * Returns all valid filter groupKeys and tagKeys, converted to lowercase.
 * @returns {object}: {
 *     groupKey1: [tagKey1, tagKey2, ...],
 *     groupKey2: [tagKey1, tagKey2, ...],
 *  }
 */
export function getFilterkeys() {
  const filterkeys = require('lessonFiltertags/keys.yml');
  return Object.keys(filterkeys).reduce((result, groupKey) => {
    result[groupKey.toLowerCase()] = filterkeys[groupKey].map(tagKey => tagKey.toLowerCase());
    return result;
  }, {});
}

/**
 * Returns filterkeys, but where each group is a Map instead of an array.
 * If a valid initialLanguage is given, set it to true/checked.
 * Note that we use Map instead of object for each group to ensure correct ordering of tags.
 * @returns {object}: {
 *     groupKey1: Map({ tagKey1: false, tagKey2: false, ...}),
 *     groupKey2: Map({ tagKey1: false, tagKey2: false, ...}),
 *     ...
 *   }
 */
export function getInitialFilter(initialLanguage) {
  const filterkeys = getFilterkeys();
  const filter = Object.keys(filterkeys).reduce( (result, groupKey) => {
    result[groupKey] = arrayToObject(filterkeys[groupKey]);
    return result;
  }, new Map()); // Use Map instead of Object to ensure correct order of tags
  if ((filterkeys.language || []).includes(initialLanguage)) {
    filter.language[initialLanguage] = true;
  }
  return filter;
}

/**
 * Get the first paragraph and first picture in the html.
 * @param {string} html The whole html
 * @param {string} path The path to the html, starting with a slash,
 *                      e.g. '/scratch/astrokatt/astrokatt_nn' or '/scratch/index'
 * @returns {string} HTML code to e.g. display in a popover.
 */
export const extractFirstPartOfHtml = (html, path) => {
  let text, picture = '';
  html = html.substring(html.indexOf('<section class="intro"'));
  const p = html.indexOf('<p>');
  const closingP = html.indexOf('</p>');
  const img = html.indexOf('<img');
  const closingFig = html.indexOf('</figure');
  if (p < closingP) {
    text = html.substring(p, closingP);
    if (text.length > 300) {
      text = html.substring(p, 300) + '...';
    }
    picture = img < closingFig ? html.substring(img, closingFig) : '';
    // Add path to image. The following regex allows for attributes with or without quotes,
    // e.g. <img src="astrokatt.png" />, <img src=astrokatt.png />, <img src=astrokatt.png/>,
    // and <img src=astrokatt.png>
    picture = picture.replace(
      /( src="?)([^" />]*)([" />])/,
      '$1' + process.env.PUBLICPATH + dirname(path).slice(1) + '/$2$3',
    );
  }
  return (picture || '') + (text || '');
};

/**
 * Fix invalid tags
 * @param {Object} tags
 * @param {string} src
 * @returns {Object} valid tags
 */
// TODO: Consider moving cleanseTags to resources/lessons.js
export function cleanseTags(tags, src) {
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
}

/**
 * Converts and array to object, where the array values becomes the object keys, and the values are 'false'.
 * @param array
 * @returns {object}
 */
export function arrayToObject(array) {
  return array.reduce((res, key) => {
    res[key] = false;
    return res;
  }, {});
}

/**
 * Make sure tagItems is an array. Try to convert to array if it is not.
 * This happens if tags is created as string or numbers (e.g. someGroupKey: tag1, tag2, 12345)
 * instead of list (e.g. someGroupKey: [tag1, tag2, 12345]) in YAML
 * @param tagItems
 * @returns {Array}
 */
export function fixNonArrayTagList(tagItems) {
  if (tagItems == null) return [];
  if (typeof tagItems === 'string') return tagItems.split(/,\s*/);
  if (!Array.isArray(tagItems) && typeof tagItems !== 'string') return fixNonArrayTagList(tagItems.toString());
  return tagItems;
}

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
export function hashCode(str) {
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
  }
  return Math.abs(hash);
}

/**
 * Get a string used to store checkboxes in localstorage
 * @param {string} path e.g. './path/to/file.md' or '/path/to/file' or 'path/to/file.md'
 * @returns {string} e.g. 'checkboxes_path/to/file'
 */
export function createCheckboxesKey(path = 'undefined') {
  path = path.match(/^\.?\/?(.*?)(?:\.md)?$/)[1]; // Remove . or / or ./ from beginning and .md from end
  return 'checkboxes_' + path;
}

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

export const anyCheckboxTrue = (checkboxes) => {
  for (let i of Object.keys(checkboxes)) {
    if (checkboxes[i] === true) {
      return true;
    }
  }
  return false;
};
