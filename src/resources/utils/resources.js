/* eslint-env node */

import {getFilterkeys} from '../../util';

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
 * Returns the path except the filename, like the unix equivalent and path.basename. Trailing slashes are ignored.
 * @param {string} path any path
 * @returns {string} only the filename
 */
export const dirname = (path) => {
  if (path.match(/^\/+$/)) { return '/'; }
  const b = path.match(/(.*)\/[^/]+\/*$/);
  return b == null ? '.' : (b[1] === '' ? '/' : b[1]);
};

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
