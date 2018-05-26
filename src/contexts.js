// NOTE: Putting these contexts in separate files might enable better code splitting.
import {dirname, removeDuplicates} from './util';


// lessonSrc/*/logo-black.png
export const iconContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]logo-black[.]png$/);

// // lessonSrc/*/index.md
// export const courseContext =
//   require.context('lessonSrc/', true, /^[.][/][^/]*[/]index[.]md$/);

// const courseFrontmatterContext =
//   require.context('frontmatter!lessonSrc/', true, /^[.][/][^/]*[/]index[^.]*[.]md$/);
// //require.context('frontmatter!lessonSrc/', true, /^[.][/][^/]*[/]index[.]md$/);


// TODO: Perhaps move courseAllLangsContext to where course info content is shown.
// TODO: Need to solve how to deal with language.
// lessonSrc/*/index*.md
// export const courseAllLangsContext =
//   require.context('lessonSrc/', true, /^[.][/][^/]*[/]index[^.]*[.]md$/);

// lessonSrc/*/playlists/*.txt
export const playlistContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]playlists[/][^/]*[.]txt$/);

// // lessonSrc/*/*/*.md, but not files README.md or README_xx.md where xx is any two letters in lower case
// export const lessonContext =
//   require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/](?!README(_[a-z]{2})?[.]md$)[^/]*[.]md$/);
//
// // lessonSrc/*/*/README.md and lessonSrc/*/*/README_xx.md where xx is any two letters in lower case
// export const readmeContext =
//   require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/]README(_[a-z]{2})?[.]md$/);
//
// // lessonSrc/*/*/*.md
// export const lessonAllContext =
//   require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/][^.]*[.]md$/);

// lessonSrc/*/*/*.md, only frontmatter (includes README-files, i.e. lærerveiledninger/teacher instructions)
const lessonFrontmatterContext =
  require.context('frontmatter!lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/][^.]*[.]md$/);

// lessonSrc/*/data.yml
const courseDataContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]data[.]yml$/);

// lessonSrc/*/*/data.yml
const lessonDataContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/][^/]+[/]data[.]yml$/);

////////////////////////////
// Context util functions //
////////////////////////////
export const getCourseIcon = (course) => {
  const path = `./${course}/logo-black.png`;
  return iconContext.keys().includes(path) ? iconContext(path) : null;
};

// // Cut off '.' at start and '/index.md' at end:
// const extractCoursePath = (course) => course.slice(1).replace(/[/]index[^.]*[.]md$/i, '');

// // Cut off '.' at start and '.md' at end:
// const extractLessonPath = (course) => course.slice(1).replace(/\.md$/i, '');
//
// const coursePathArray = courseContext.keys().map(extractCoursePath);
// const lessonPathArray = lessonContext.keys().map(extractLessonPath);
// const readmePathArray = readmeContext.keys().map(extractLessonPath);
//
// export const isValidLessonPath = (path) => lessonPathArray.includes(path);
// export const isValidReadmePath = (path) => readmePathArray.includes(path);
// export const isValidCoursePath = (path) => coursePathArray.includes(path);

// Cut off '.' at start and '.md' at end:
const extractLessonPath = (course) => course.slice(1).replace(/[.]md$/i, '');

// lessonPaths are on the form '/scratch/astrokatt/astrokatt' or '/scratch/astrokatt/README'
export const lessonPaths = lessonFrontmatterContext.keys().map(extractLessonPath);
export const lessonReadmePaths = lessonPaths.filter(p => p.includes('README'));
export const lessonNoReadmePaths = lessonPaths.filter(p => !p.includes('README'));

// coursePaths are on the form '/scratch' or '/python'
export const coursePaths = removeDuplicates(lessonPaths.map(p => dirname(dirname(p))));


/**
 * @param {string} path Starts with '/' and ends with no extension
 * @returns {boolean}
 */
export const isValidCoursePath = (path) => coursePaths.includes(path);

/**
 * @param {string} path Starts with '/' and ends with no extension
 * @returns {boolean}
 */
export const isValidLessonPath = (path) => lessonPaths.includes(path);

/**
 * @param {string} path Starts with '/' and ends with no extension
 * @returns {boolean}
 */
export const isValidReadmePath = (path) => lessonReadmePaths.includes(path);

// /**
//  * @param {string} path Starts with '/', like '/scratch' or '/python'
//  * @returns {object} Frontmatter data
//  */
// export const getCourseFrontmatter = (path) => courseFrontmatterContext('.' + path + '/index.md');

/**
 * @param {string} path Starts with '/', like '/scratch/astrokatt/astrokatt' or '/scratch/astrokatt/README'
 * @returns {object} Frontmatter data
 */
export const getLessonFrontmatter = (path) => lessonFrontmatterContext('.' + path + '.md');

// /** Get path to a lessons course info (course index file) in the same language as the lesson
//  *
//  * @param {string} lessonPath Same as path in getLessonFrontmatter
//  * @returns {string|null} Path to a lessons course info (index-file) with same language as lesson, or null
//  */
// export const getCourseInfoPathFromLessonPath = (lessonPath) => {
//   const lesson = getLessonFrontmatter(lessonPath);
//   const coursePath = lessonPath.slice(0, lessonPath.indexOf('/', 2)); // Remove everything starting from the second '/'
//   const relevantCourseInfoPaths = courseFrontmatterContext.keys().filter(p => p.startsWith(coursePath));
//   for (const courseInfoPath of relevantCourseInfoPaths) {
//     const course = courseFrontmatterContext(courseInfoPath);
//     if (course.language === lesson.language) {
//       return courseInfoPath;
//     }
//   }
//   return null;
// };



/////////////////////////
// METADATA (data.yml) //
/////////////////////////

/**
 * Returns a json-object corresponding to a data.yml file from course or lesson
 * @param {string} path Starts with './' and ends without a slash, e.g. './scratch' or './scratch/astrokatt'
 * @param {context} context A require.context with data.yml files
 * @returns {object} A json-object with data from data.yml
 */
const getMetadata = (path, context) => {
  const dataPath = path + '/data.yml';
  return context.keys().includes(dataPath) ? context(dataPath) : {};
};

/**
 * @param {string} path The course path, e.g. './scratch'
 * @returns {Object} See getMetadata()
 */
export const getCourseMetadata = (path) => getMetadata(path, courseDataContext);

/**
 * @param {string} path The lesson path, e.g. './scratch/astrokatt'
 * @returns {Object} See getMetadata()
 */
export const getLessonMetadata = (path) => getMetadata(path, lessonDataContext);
