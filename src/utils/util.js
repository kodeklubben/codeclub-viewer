import {getFilterkeys} from './filterUtils';

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
 * Return the keys of an object whose values are true (or true-ish),
 * i.e. if obj={hat: true, cat: false, dog: false, log: true}, the function will return [hat, log]
 * @param {object} obj
 * @returns {string[]} An array of the keys that have true-ish values
 */
export const getKeysWithTrueValues = (obj) => Object.keys(obj).filter(key => obj[key]);

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
