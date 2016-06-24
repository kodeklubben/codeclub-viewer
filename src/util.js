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
    const tags = cleanseTags(lessonFrontMatter.tags);
    res = mergeObjects(tags, res);
    return res;
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
    const tags = cleanseTags(lessonFrontMatter.tags);
    const lesson = {name: lessonFrontMatter.title, tags: tags};
    const index = res.findIndex(course => course.name === courseName);

    // If course already exists, push the new lesson. Else make a new course
    if(index >= 0) {
      res[index].lessons.push(lesson);
    }else{
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
 * Will combine lists in same properties from objA and objB. The lists will be combined as a set of distinct elements
 * @param {Object} objA
 * @param {Object} objB
 * @returns {Object} merged object
 */
export function mergeObjects(objA, objB) {
  const allProps = [...new Set(Object.keys(objA).concat(Object.keys(objB)))];
  return allProps.reduce((res, propName) => {
    const listItemsA = objA.hasOwnProperty(propName) ? objA[propName] : [];
    const listItemsB = objB.hasOwnProperty(propName) ? objB[propName] : [];
    res[propName] = [...new Set(listItemsA.concat(listItemsB))];
    return res;
  }, {});
}

/**
 * Add tag to filter
 * @param {Object} tag
 * @param {Object} filter
 * @returns {Object} filter with tag merged into it
 */
export function addTagToFilter(tag, filter) {
  return mergeObjects(filter, tag);
}

/**
 * Removes tag from filter
 * @param {Object} tag
 * @param {Object} filter
 * @returns {Object} filter without the tag
 */
export function removeTagFromFilter(tag, filter) {
  // Check if tag is empty or contains more than one tagGroup
  if(Object.keys(tag).length !== 1) return filter;
  
  // Tag has one tagGroup with one tagItem
  const groupName = Object.keys(tag)[0];
  const tagName = tag[groupName].toString();
  
  // Check if tag contains none or more than one tagItem
  if(tag[groupName].length !== 1) return filter;

  return Object.keys(filter).reduce((res, filterGroupName) => {
    const filterTagItems = filter[filterGroupName];
    // Add all items except the one to be removed
    const itemsToAdd = filterTagItems.filter(filterTagName => !(filterGroupName === groupName && filterTagName === tagName));
    if(itemsToAdd.length === 0) return res;
    return mergeObjects(res, {[filterGroupName]: itemsToAdd});
  }, {});
}

/**
 * Get courses that has at least one lesson that matches filter
 * @param {Array} courses
 * @param {Object} filter
 * @returns {Array} filtered courses
 */
export function filterCourses(courses, filter) {
  const coursesWithFilteredLessons = courses.map(course => {
    const newCourse = {...course};
    newCourse.lessons = filterLessons(course.lessons, filter);
    return newCourse;
  });

  // Find and sort courses that have at least one lesson that matches filter
  return coursesWithFilteredLessons.filter((course) => {
    return course.lessons.length > 0;
  });

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
 * @returns {Object} valid tags
 */
export function cleanseTags(tags) {
  if(tags == null) return {};

  return Object.keys(tags).reduce((result, groupName) => {
    const tagItems = fixNonArrayTagList(tags[groupName]);
    // Ignore tagGroups with no tagItems
    if(tagItems.length === 0) return result;
    result[groupName] = tagItems;
    return result;
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
  if(tagItems == null) return [];
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
  if(Object.keys(filterTags).length === 0) return true;

  const lessonTags = lesson.tags;
  for(let groupName in filterTags){
    if(filterTags.hasOwnProperty(groupName)) {
      const filterTagItems = filterTags[groupName];
      const lessonTagItems = lessonTags[groupName] || [];
      // Check if there exist at least one filterTag that the lesson does not have
      if (filterTagItems.find(tagItem => lessonTagItems.indexOf(tagItem) < 0)) return false;
    }
  }
  // Lesson contains all tags in the filter
  return true;
}
