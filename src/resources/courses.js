import memoize from 'fast-memoize';
import {cleanseTags} from '../util';

// lessonSrc/*/course.yml
const coursesContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]course[.]yml$/);

/**
 * Get language independent data on all courses from course.yml files.
 * External courses are courses that have 'isExternal: true' in course.yml.
 * External courses have no lessons.
 * Currently, only external courses have tags, but this could change in the future.
 * @returns {object} An object of courses, e.g.
 * {
 *   kodegenet: {
 *     isExternal: true,
 *     tags: {
 *       topic: ['block_based', 'app'],
 *       subject: ['technology', 'programming'],
 *       grade: ['secondary', 'junior'],
 *     },
 *   },
 *   khan_academy: {
 *     ...
 *   },
 *   ...
 * }
 */
const getData = memoize(
  () => {
    const courses = {};
    for (const key of coursesContext.keys()) {
      const [/* ignore */, course] = key.match(/^[.][/]([^/]+)[/]course[.]yml$/);
      const {isExternal, tags} = coursesContext(key);
      courses[course] = {isExternal, tags: cleanseTags(tags, key)};
    }
    return courses;
  }
);

/**
 * Get a list of internal courses sorted in alphabetical order
 * @returns {string[]} E.g. ['python', 'scratch', ...]
 */
export const getCourses = memoize(
  () => Object.keys(getData()).filter(course => !getData()[course].isExternal).sort()
);

/**
 * Get a list of external courses sorted in alphabetical order
 * @returns {string[]} E.g. ['khan_academy', 'kodegenet', ...]
 */
export const getExternalCourses = memoize(
  () => Object.keys(getData()).filter(course => getData()[course].isExternal).sort()
);

/**
 * Get tags for the course.
 * @param {string} course E.g. 'kodegenet'
 * @returns {object} E.g.
 {
   topic: ['block_based', 'app'],
   subject: ['technology', 'programming'],
   grade: ['secondary', 'junior'],
 }
 */
export const getCourseTags = (course) => (getData()[course] || {}).tags || {};

/**
 * Whether the (internal) course exists
 * @param {string} course E.g. 'scratch'
 * @returns {boolean}
 */
export const isValidCourse = (course) => getCourses().includes(course);

/**
 * Get language independent path to course
 * @param {string} course E.g. 'scratch'
 * @returns {string} The path to the course, e.g. '/scratch'
 */
export const getLanguageIndependentCoursePath = (course) => isValidCourse(course) ? `/${course}` : '';
