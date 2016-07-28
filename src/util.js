/**
 * Makes first character in str upper case
 *
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get tags from all lessons and external courses
 * Takes any number of contexts as argument
 * @returns {Object} tags
 */
export function getTags() {
  return [...arguments].reduce((res, context) => (
    {...res, ...extractTags(context)}
  ), {});
}

/**
 * Get all tags from lesson or courses in context
 * @param context
 * @returns {Object} tags
 */
function extractTags(context) {
  return (context.keys()).reduce((res, path) => {
    const fm = context(path).frontmatter;
    const tags = cleanseTags(fm.tags, true);
    return mergeTags(res, tags);
  }, {});
}

/**
 * 
 * @param {Object} tagsA
 * @param {Object} tagsB
 * @returns {Object} mergedTags
 */
export function mergeTags(tagsA, tagsB){
  const groups = [...new Set(Object.keys(tagsA).concat(Object.keys(tagsB)))];
  return groups.reduce((res, groupName) => {
    const tagsFromA = tagsA[groupName];
    const tagsFromB = tagsB[groupName];
    return {...res, [groupName]: {...tagsFromA, ...tagsFromB}};
  }, {});
}

export function getLessons(lessonContext, readmeContext) {
  const paths = lessonContext.keys();

  return paths.reduce((res, path) => {
    // Course name is between './' and second '/'
    const course = path.slice(2, path.indexOf('/', 2)).toLowerCase();
    const lessonFrontMatter = lessonContext(path).frontmatter;
    const tags = cleanseTags(lessonFrontMatter.tags, false);
    // Everything between '.' and last '/'. Add '/README' at the end
    const readmePath = path.slice(1, path.lastIndexOf('/')) + '/README';
    const hasReadme = readmeContext.keys().indexOf('.' + readmePath + '.md') !== -1;

    res[path] = {
      title: lessonFrontMatter.title || '',
      author: lessonFrontMatter.author || '',
      level: lessonFrontMatter.level,
      indexed: lessonFrontMatter.indexed == null ? true : lessonFrontMatter.indexed,
      external: lessonFrontMatter.external || '',
      readmePath: hasReadme ? readmePath : '',
      course,
      tags,
      // Everything between '.' and '.md'
      path: path.slice(1, path.length - 3)
    };

    return res;
  }, {});
}

export function getLevelName(level) {
  switch (level) {
    case '1':
      return 'Introduksjon';
    case '2':
      return 'Nybegynner';
    case '3':
      return 'Erfaren';
    case '4':
      return 'Ekspert';
  }
  return level;
}

export function getTeacherInfo(context) {
  return context(context.keys()[0]).frontmatter.teacherInfo;
}

///////////////////////////////////
//////// HELPER FUNCTIONS /////////
///////////////////////////////////

/**
 * Fix invalid tags
 * @param {Object} tags
 * @param {boolean} toObject
 * @returns {Object} valid tags
 */
export function cleanseTags(tags, toObject = false) {
  if (tags == null) return {};

  return Object.keys(tags).reduce((result, groupName) => {
    let tagItemsArray = fixNonArrayTagList(tags[groupName]).filter(item => item.length > 0);

    // Make groupName and all tags lowerCase
    tagItemsArray = tagItemsArray.map(tagItem => tagItem.toLowerCase());
    groupName = groupName.toLowerCase();

    // Ignore tagGroups with no tagItems
    if (tagItemsArray.length === 0) return result;

    // Add tagItems
    result[groupName] = toObject ? convertTagItemsArrayToObject(tagItemsArray) : tagItemsArray;
    return result;
  }, {});
}

function convertTagItemsArrayToObject(tagItemsArray) {
  return tagItemsArray.reduce((res, item) => {
    res[item] = false;
    return res;
  }, {});
}

/**
 * Make sure tagItems is an array. Try to convert to array if it is not.
 * This happens if tags is created as string or numbers (e.g. someGroupName: tag1, tag2, 12345)
 * instead of list (e.g. someGroupName: [tag1, tag2, 12345]) in YAML
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
 * Check if tags contain at least one tag in each group that are checked in filter
 * @param {Object} tags
 * @param {Object} filter
 * @returns {boolean}
 */
export function tagsMatchFilter(tags, filter) {
  // Filter is empty
  if (Object.keys(filter).length === 0) return true;

  // Get groups with checked tags from filter
  const checkedFilter = getFilterWithOnlyCheckedTags(filter);

  const groups = Object.keys(checkedFilter);
  // Find a group where none of the checked tags from filter is in tags
  const groupWithNoCheckedTags = groups.find((group) => {
    if (!tags.hasOwnProperty(group)) return true;

    const tagNamesInTags = tags[group];
    const tagNamesInFilter = Object.keys(checkedFilter[group]);
    // Check if tags has at least one of the checked tags in filter
    return arrayIntersection(tagNamesInFilter, tagNamesInTags).length === 0;
  });

  // True if tags has at least one tag in each group that are checked in the filter
  return groupWithNoCheckedTags == null;
}

/**
 * Get identical items in arrA and arrB
 * @param {Array} arrA
 * @param {Array} arrB
 * @returns {Array}
 */
export function arrayIntersection(arrA, arrB) {
  return arrA.filter(item => arrB.indexOf(item) !== -1);
}

/**
 * Get filter with only checked tags
 * @param {Object} filter
 * @returns {Object} checkedFilter
 */
export function getFilterWithOnlyCheckedTags(filter) {
  return Object.keys(filter).reduce((res, groupName) => {
    const tags = filter[groupName];
    const checkedTags = Object.keys(tags).reduce((prev, tagName) => {
      const isChecked = tags[tagName];
      return isChecked ? {...prev, [tagName]: true} : prev;
    }, {});
    return Object.keys(checkedTags).length > 0 ? {...res, [groupName]: checkedTags} : res;
  }, {});
}
