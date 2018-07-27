import memoize from 'fast-memoize';
import {assignDeep, capitalize, getAvailableLanguages} from '../util';

// lessonSrc/*/index*.md, only frontmatter
// The keys are of the form './course/index*.md'
// Note that the regex should be identical to the one for courseContent.js.
const courseFrontmatterContext =
  require.context('!!json-loader!front-matter-loader?onlyAttributes!lessonSrc/',
    true, /^[.][/][^/]+[/]index[^.]*[.]md$/);


/**
 * Get language dependent data on all courses based on the index*.md files.
 * Note that not all languages need to be present.
 * Also, only courses with isExternal:true in course.yml have 'external'.
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
const getData = memoize(
  () => {
    const courses = {};
    for (const key of courseFrontmatterContext.keys()) {
      const [/* ignore */, course, file] = key.match(/^[.][/]([^/]+)[/](index[^.]*)[.]md$/);
      const {title = '', external = '', language} = courseFrontmatterContext(key);
      if (getAvailableLanguages().includes(language)) {
        const path = `/${course}/${file}`;
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
 * Get the frontmatter of a course for a given language
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {object} E.g. {title: 'Scratch', key: './scratch/index.md'}
 */
const getCourseFrontmatter = (course, language) => (getData()[course] || {})[language] || {};

/**
 * Get the title of a course for a given language
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {string} The title of the course
 */
export const getCourseTitle = (course, language) => getCourseFrontmatter(course, language).title || capitalize(course);

/**
 * Get the external link of an external course for a given language if it exists (empty string if not)
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {string} The external link of the course, or an empty string
 */
export const getCourseExternalLink = (course, language) => getCourseFrontmatter(course, language).external || '';

/**
 * Get the path of a course for a given language
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {string}
 */
export const getCoursePath = (course, language) => getCourseFrontmatter(course, language).path;

/**
 * TODO: See if this method can be removed when using dynamic imports for courseContent
 * Get the context key of a course for a given language
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {string}
 */
export const getCourseKey = (course, language) => getCourseFrontmatter(course, language).key;

/**
 * Get all languages of the course (given by course title)
 * @param {string} course E.g. 'scratch'
 * @returns {string[]} A list of languages, e.g. ['nb', 'en']
 */
export const getCourseLanguages = (course) => Object.keys((getData()[course] || {}));
