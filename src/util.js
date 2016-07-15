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
    return {...res, ...tags};
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
    let tagItemsArray = fixNonArrayTagList(tags[groupName]);

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
 * Check if tags contain all tags in filter
 * @param {Object} tags
 * @param {Object} filter
 * @returns {boolean} tagsContainAllTagsInFilter
 */
export function tagsContainAllTagsInFilter(tags, filter) {
  // Filter is empty
  if (Object.keys(filter).length === 0) return true;

  for (let groupName in filter) {
    if (filter.hasOwnProperty(groupName)) {
      const filterTagItems = filter[groupName];
      const tagItems = tags[groupName] || [];
      // Check if there exist at least one filterTag that the tags does not have
      if (Object.keys(filterTagItems).find((tagItemName) => {
        const tagInFilter = filterTagItems[tagItemName];
        // Tag is in filter and tags does not contain the tag
        return tagInFilter && tagItems.indexOf(tagItemName) < 0;
      })) return false;// Found a filterTag that is NOT in lesson
    }
  }
  // Tags contains all tags in the filter
  return true;
}
