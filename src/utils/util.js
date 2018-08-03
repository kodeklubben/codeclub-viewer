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
