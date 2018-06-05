import memoize from 'fast-memoize';
import {assignDeep, getAvailableLanguages} from '../util';

// lessonSrc/*/index*.md, only frontmatter
// The keys are of the form './course/index*.md'
// Note that this require.context should be identical to the one for courseContent.js, except with 'frontmatter!'
const courseFrontmatterContext =
  require.context('frontmatter!lessonSrc/', true, /^[.][/][^/]+[/]index[^.]*[.]md$/);


/**
 * Get all courses, with all languages, based on the index*.md files.
 * Note that not all languages need to be present, and that 'external' only exists some places.
 * It is assumed that if 'external' exists for a course, there are no lessons defined.
 *
 * @returns {object} An object with the frontmatter data of courses, e.g.
 * {
 *   scratch: {
 *     nb: {
 *       title: 'Scratch',
 *       key: './scratch/index.md',
 *     },
 *     en: {
 *       title: 'Scratch',
 *       key: './scratch/index_en.md',
 *     },
 *   },
 *   kodegenet: {
 *     nb: {
 *       title: 'Kodegenet',
 *       external: 'https://kodegenet.no/tracks/',
 *       key: './kodegenet/index.md',
 *     },
 *   },
 *   python: {
 *     ...
 *   },
 *   ...
 * }
 */
const getCourses = memoize(
  () => {
    console.log('DEBUG: resources/courseFrontmatter.js:getCourses()');
    const courses = {};
    for (const key of courseFrontmatterContext.keys()) {
      const [/* ignore */, course] = key.match(/^[.][/]([^/]+)[/]index[^.]*[.]md$/);
      const {title = '', language} = courseFrontmatterContext(key);
      if (getAvailableLanguages().includes(language)) {
        const data = {title, key};
        assignDeep(courses, [course, language], data);
      } else {
        console.warn(`The course info ${key} did not have a valid language (${language})`);
      }
    }
    return courses;
  }
);

/**
 * Get a list of all courses based on the course index files
 * @returns {string[]} An array of all courses, e.g. ['scratch', 'python', ...]
 */
export const getAllCourses = memoize(
  () => {
    console.log('DEBUG: resources/courseFrontmatter.js:getAllCourses()');
    return Object.keys(getCourses());
  }
);

/**
 * Get the frontmatter of a course for a given language
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {object} E.g. {title: 'Scratch', key: './scratch/index.md'}
 */
export const getCourseFrontmatter = (course, language) => (getCourses()[course] || {})[language] || {};

/**
 * Get the title of a course for a given language
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {string} The title of the course
 */
export const getCourseTitle = (course, language) => getCourseFrontmatter(course, language).title || '';

/**
 * Returns all courses in the given languages that have external defined
 * @param {string[]} languages
 * @returns {string[]} An array of all the external courses in the given languages
 */
export const getExternalCourses = (languages) => {
  if (languages.length === 0) { return []; }
  return getAllCourses().filter(course => {
    const courseObj = getCourses()[course];
    for (const lang of languages) {
      if (courseObj.hasOwnProperty(lang) && courseObj[lang].external) {
        return true;
      }
    }
    return false;
  });
};
