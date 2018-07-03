import memoize from 'fast-memoize';
import {assignDeep, capitalize, getAvailableLanguages} from '../util';

// lessonSrc/*/index*.md, only frontmatter
// The keys are of the form './course/index*.md'
// Note that the regex should be identical to the one for courseContent.js.
const courseFrontmatterContext =
  require.context('!!json-loader!front-matter-loader?onlyAttributes!lessonSrc/',
    true, /^[.][/][^/]+[/]index[^.]*[.]md$/);


/**
 * Get all courses, with all languages, based on the index*.md files.
 * Note that not all languages need to be present.
 * Also, only courses with isExternal:true in data.yml have 'external'.
 * External courses have no lessons.
 *
 * @returns {object} An object with the frontmatter data of courses, e.g.
 * {
 *   scratch: {
 *     nb: {
 *       title: 'Scratch',
 *       path: '/scratch/index',
 *       key: './scratch/index.md',
 *     },
 *     en: {
 *       title: 'Scratch',
 *       path: '/scratch/index_en',
 *       key: './scratch/index_en.md',
 *     },
 *   },
 *   kodegenet: {
 *     nb: {
 *       title: 'Kodegenet',
 *       external: 'https://kodegenet.no/tracks/',
 *       path: '/kodegenet/index',
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
    const courses = {};
    for (const key of courseFrontmatterContext.keys()) {
      const [/* ignore */, course, file] = key.match(/^[.][/]([^/]+)[/](index[^.]*)[.]md$/);
      const {title = '', external = '', language} = courseFrontmatterContext(key);
      if (getAvailableLanguages().includes(language)) {
        const path = `/${course}/${file}`; // TODO: Add publicpath?
        const data = {title, external, path, key};
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
  () => Object.keys(getCourses())
);

/**
 * Whether the course exists
 * @param {string} course E.g. 'scratch'
 * @returns {boolean}
 */
export const isValidCourse = (course) => getAllCourses().includes(course);

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
export const getCourseTitle = (course, language) => getCourseFrontmatter(course, language).title || capitalize(course);

/**
 * Get language independent path to course
 * @param {string} course E.g. 'scratch'
 * @returns {string} The path to the course, e.g. '/scratch'
 */
export const getLanguageIndependentCoursePath = (course) => isValidCourse(course) ? `/${course}` : '';

/**
 * Get all languages of the course (given by course title)
 * @param {string} course E.g. 'scratch'
 * @returns {string[]} A list of languages, e.g. ['nb', 'en']
 */
export const getCourseLanguages = (course) => Object.keys((getCourses()[course] || {}));