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

export function getLessons(lessonContext, readmeContext, courseContext) {
  const paths = lessonContext.keys();

  return paths.reduce((res, path) => {
    // Course name is between './' and second '/'
    const coursePath = path.slice(0, path.indexOf('/', 2)) + '/index.md';
    const courseName = path.slice(2, path.indexOf('/', 2)).toLowerCase();

    const courseFrontmatter = courseContext(coursePath).frontmatter;
    const lessonFrontmatter = lessonContext(path).frontmatter;

    const language = lessonFrontmatter.language;

    // Inherit tags from course, and override with lessonTags
    const courseTags = cleanseTags(courseFrontmatter.tags, false);
    const lessonTags = cleanseTags(lessonFrontmatter.tags, false);
    const tags = {...courseTags, ...lessonTags};

    // Gets the valid readmePath for the lesson, if it exists
    const readmePath = getReadmePath(readmeContext, language, path);

    res[path] = {
      title: lessonFrontmatter.title || '',
      author: lessonFrontmatter.author || '',
      level: lessonFrontmatter.level,
      indexed: lessonFrontmatter.indexed == null ? true : lessonFrontmatter.indexed,
      external: lessonFrontmatter.external || '',
      readmePath: readmePath,
      course: courseName,
      language: language,
      tags,
      // Everything between '.' and '.md'
      path: path.slice(1, path.length - 3)
    };

    return res;
  }, {});
}

export function getLevelName(level) {
  const levelData = require('lessonSrc/level-config.json');
  return(levelData[level.toString()]);
}

export function getCourseInfo(courseName) {
  const courseInfo = require('onlyContent!lessonSrc/' + courseName + '/index.md');
  return courseInfo.content;
}

export function getInfo(context) {
  return context.keys().length !== 0
    ? context(context.keys()[0]).frontmatter.info
    : {};
}

///////////////////////////////////
//////// HELPER FUNCTIONS /////////
///////////////////////////////////

/**
* Checks if a lesson with a given path has a README-file.
* Accepts README-files on the form /README or /README_(ISO_CODE).
**/
const getReadmePath = (readmeContext, language, path) => {
  path = path.slice(1, path.lastIndexOf('/'));
  const readmeContextKeys = readmeContext.keys();
  const readmePathAndLanguageCode = path + '/README_' + language;
  const readmePathNoLanguageCode = path + '/README';

  if(readmeContextKeys.indexOf('.' + readmePathAndLanguageCode + '.md') !== -1){
    return readmePathAndLanguageCode;
  }
  else if(readmeContextKeys.indexOf('.' + readmePathNoLanguageCode + '.md') !== -1){
    if(language === readmeContext('.' + readmePathNoLanguageCode + '.md').frontmatter.language){
      return readmePathNoLanguageCode;
    }
  }
  return '';
};

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
 * Return true only if tags of a lesson contains all the checked tags in the filter
 *
 * @param {Object} lessonTags
 * @param {Object} filter
 * @returns {boolean}
 */
export function tagsMatchFilter(lessonTags, filter) {
  // lessonTags is e.g. {'tema': ['spill'], 'fag': ['naturfag']}
  // filter is e.g. {'tema': {'spill':false, 'animasjon': true}, 'utstyr': {'ipad': false, 'arduino': true}}}
  for (const groupName of Object.keys(filter)) { // groupName is e.g. 'tema'
    const filterGroup = filter[groupName]; // the whole filter group, e.g. {'spill':false, 'animasjon': true}
    const tagNames = Object.keys(filter[groupName]); // all tags in this filter group, e.g. ['spill','animasjon']
    const checkedTagNames = tagNames.filter(tag => filterGroup[tag]); // only the checked tags; e.g. ['animasjon']
    const lessonGroup = lessonTags[groupName]; // e.g. ['spill']
    if (checkedTagNames.length > 0 && !lessonGroup) {
      // this is a filter with checked tags, and lesson doesn't have this group
      return false;
    }
    for (const checkedFilterTag of checkedTagNames) {
      if (lessonGroup.indexOf(checkedFilterTag) === -1) { // lessonGroup doesn't contain checkedFilterTag
        return false;
      }
    }
  }

  return true; // The lessonTags contained all the checked filterTags
}

export function removeHtmlFileEnding(lessonPage) {
  // RegEx for matching and removing parts of text that starts with 
  // <a href= ../ followed by anything not containing whitespaces, and ends with .html">
  return lessonPage.replace(/(<a href="\.\.\/[^\s]*)\.html(">)/g, '$1$2');
}

/**
* Returns the readmePath of a lesson with the given lessonPath
*
* @param {Object} lessons
* @param {String} lessonPath
* @returns {String or undefined}
*/
export const getReadmepathFromLessonpath = (lessons, lessonPath) => {
  for(let key of Object.keys(lessons)){
    if(lessons[key].readmePath === lessonPath){
      return lessons[key]['external'] === '' ? lessons[key]['path'] : undefined;
    }
  }
};
