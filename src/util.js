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
 * Get tags from all lessons in lessonContext
 * @param lessonContext
 * @returns {Object} tags
 */
export function getTags(lessonContext) {
  const paths = lessonContext.keys();

  return paths.reduce((res, path) => {
    const lessonFrontMatter = lessonContext(path).frontmatter;
    const tags = cleanseTags(lessonFrontMatter.tags, true);
    return {...res, ...tags};
  }, {});
}

/**
 * Get list of all courses in lessonContext
 * @param lessonContext
 * @param iconContext
 * @returns {Array}
 */
export function getCourses(lessonContext, iconContext) {
  const paths = lessonContext.keys();

  return paths.reduce((res, path) => {
    const courseName = path.slice(2, path.indexOf('/', 2));
    const lessonFrontMatter = lessonContext(path).frontmatter;
    const tags = cleanseTags(lessonFrontMatter.tags, false);
    const lesson = {name: lessonFrontMatter.title, tags: tags};
    const index = res.findIndex(course => course.name === courseName);

    // If course already exists, push the new lesson. Else make a new course
    if (index >= 0) {
      res[index].lessons.push(lesson);
    } else {
      res.push({
        lessons: [lesson],
        name: courseName,
        iconPath: iconContext('./' + courseName + '/logo-black.png'),
        path: path
      });
    }

    return res;
  }, []);
}

/**
 * Get lessons that have all tags that exist in filter
 * @param {Array} lessons
 * @param {Object} filter
 * @returns {Array} filtered lessons
 */
export function filterLessons(lessons, filter) {
  // Find lessons that matches filter
  return lessons.filter((lesson) => {
    return lessonHasAllTags(lesson, filter);
  });
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
export function cleanseTags(tags, toObject) {
  if (tags == null) return {};

  return Object.keys(tags).reduce((result, groupName) => {
    let tagItemsArray = fixNonArrayTagList(tags[groupName]);
    // Make all tags lowerCase
    tagItemsArray = tagItemsArray.map(tagItem => tagItem.toLowerCase());

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
 * Check if lesson contains all tags in filterTags
 * @param {Object} lesson
 * @param {Object} filterTags
 * @returns {boolean} lesson contains all tags required by filter
 */
export function lessonHasAllTags(lesson, filterTags) {
  // Filter is empty
  if (Object.keys(filterTags).length === 0) return true;

  const lessonTags = lesson.tags;
  for (let groupName in filterTags) {
    if (filterTags.hasOwnProperty(groupName)) {
      const filterTagItems = filterTags[groupName];
      const lessonTagItems = lessonTags[groupName] || [];
      // Check if there exist at least one filterTag that the lesson does not have
      if (Object.keys(filterTagItems).find((tagItemName) => {
        const tagInFilter = filterTagItems[tagItemName];
        // FilterTag is checked and lesson does not have tag
        return tagInFilter && lessonTagItems.indexOf(tagItemName) < 0;
      })) return false;// Found a filterTag that is NOT in lesson
    }
  }
  // Lesson contains all tags in the filter
  return true;
}
