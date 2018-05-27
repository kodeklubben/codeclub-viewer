/* eslint-env node */

/**
 * Makes first character in str upper case
 *
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * Returns the filename, like the unix equivalent and path.dirname. Trailing slashes are ignored.
 *
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
 *
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
 *
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



// /**
//  *
//  * @param {string} path The path to a lesson file, without slash in front and without '.md' at the end.
//  * @returns {string} HTML code to e.g. display in a popover.
//  */
// export function getLessonIntro(path) {
//   const publicPath = process.env.PUBLICPATH;
//   let lessonContent = require('lessonSrc/' + path + '.md').content;
//   let text, picture = '';
//   lessonContent = lessonContent.substring(lessonContent.indexOf('<section class="intro"'));
//   const p = lessonContent.indexOf('<p>');
//   const closingP = lessonContent.indexOf('</p>');
//   const img = lessonContent.indexOf('<img');
//   const closingFig = lessonContent.indexOf('</figure');
//   if (p < closingP) {
//     text = lessonContent.substring(p, closingP);
//     if (text.length > 300) {
//       text = lessonContent.substring(p, 300) + '...';
//     }
//     picture = img < closingFig ? lessonContent.substring(img, closingFig) : '';
//     // Add path to image. Regex allows for attributes with or without quotes, e.g. <img src="astrokatt.png" />,
//     // <img src=astrokatt.png />, <img src=astrokatt.png/>, and <img src=astrokatt.png>
//     picture = picture.replace(/( src="?)([^" />]*)([" />])/, '$1' + publicPath + dirname(path) + '/$2$3');
//   }
//   return (picture || '') + (text || '');
// }

/**
 * Fix invalid tags
 * @param {Object} tags
 * @param {string} src
 * @returns {Object} valid tags
 */
// TODO: Consider moving cleanseTags to resources/lessonData.js
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

// /**
//  * Return true only if tags of a lesson contains all the checked tags in the filter
//  *
//  * @param {Object} lessonTags e.g. {topic: ['game'], subject: ['science']}
//  * @param {Object} filter e.g. {topic: {game: false, animation: true}, subject: {mathematics: false, english: true}}}
//  * @returns {boolean}
//  */
// export function tagsMatchFilter(lessonTags, filter) {
//   const languageTags = filter['language'] ? Object.keys(filter['language']) : [];
//   const checkedLanguageTags = languageTags.filter(tag => filter['language'][tag]);
//
//   for (let groupKey of Object.keys(filter)) { // groupKey is e.g. 'topic'
//     const filterGroup = filter[groupKey]; // the whole filter group, e.g. {game: false, animation: true}
//     const tagKeys = Object.keys(filter[groupKey]); // all tags in this filter group, e.g. ['game','animation']
//    const checkedTagKeys = tagKeys.filter(tagKey => filterGroup[tagKey]); // only the checked tags; e.g. ['animation']
//     const lessonGroup = lessonTags[groupKey]; // e.g. ['game']
//     if (checkedTagKeys.length > 0 && !lessonGroup) {
//       // this is a filter with checked tags, and lesson doesn't have this group
//       return false;
//     }
//     // OR-tests the language group
//     if(groupKey === 'language' && checkedLanguageTags.length !== 0
//       && checkedLanguageTags.filter(tagKey => lessonGroup.includes(tagKey)).length === 0){
//       return false;
//     }
//     // AND-tests everything else
//     for (const checkedTagKey of checkedTagKeys) {
//       // lessonGroup doesn't contain checkedFilterTag
//       if (groupKey !== 'language' && !lessonGroup.includes(checkedTagKey)) {
//         return false;
//       }
//     }
//   }
//
//   return true; // The lessonTags contained all the checked filterTags
// }

/**
 * Return true only if tags of a lesson contains all the checked tags in the filter
 *
 * @param {Object} lessonTags LessonTags or courseTags e.g. {topic: ['game'], subject: ['science']}
 * @param {Object} filter e.g. {topic: {game: false, animation: true}, subject: {mathematics: false, english: true}}}
 * @returns {boolean}
 */
export const tagsMatchFilter = (lessonTags, filter) => {
  const groupKeys = Object.keys(filter); // groupKeys is e.g. ['topic', 'subject']
  for (let groupKey of groupKeys) { // groupKey is e.g. 'topic'
    const filterGroup = filter[groupKey]; // the whole filter group, e.g. {game: false, animation: true}
    const tagKeys = Object.keys(filter[groupKey]); // all tags in this filter group, e.g. ['game','animation']
    const checkedTagKeys = tagKeys.filter(tagKey => filterGroup[tagKey]); // only the checked tags; e.g. ['animation']
    const lessonGroup = lessonTags[groupKey] || []; // e.g. ['game']
    if (checkedTagKeys.length > 0 && lessonGroup.length === 0) {
      // this is a filter with checked tags, and lesson doesn't have this group
      return false;
    }
    if (groupKey === 'language') {
      // If not lessonGroup includes any(some) checkedTagKeys --> don't include lesson,
      // meaning: Include lesson if it has ANY of the checked tags in filter (OR-test / union)
      if (!checkedTagKeys.some(lessonGroup.includes)) {
        return false;
      }
    } else {
      // If not lessonGroup includes every checkedTagKeys --> don't include lesson,
      // meaning: Include lesson ONLY if it has tags matching ALL checked tags in filter (AND-test / intersection)
      if (!checkedTagKeys.every(lessonGroup.includes)) {
        return false;
      }
    }
  }

  return true; // The lessonTags contained all the checked filterTags
};

/**
* Returns languages defined as available
* All available languages must be defined here
* @returns {Array} An array of available languages
*/
export const getAvailableLanguages = () => getFilterkeys().language;


/**
* Returns an object with only the courses that have playlists
*
* @param {object} courses
* @returns {object}
*/
export const coursesWithPlaylists = (courses) => {
  // TODO: make this
  return courses;
};

/**
 * Based on an implementation of Java's string to integer hashCode function.
 * See e.g. https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 */
export function hashCode(str) {
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
  }
  return Math.abs(hash);
}

export function createCheckboxesKey(path) {
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
