import memoize from 'fast-memoize';
import {cleanseTags} from '../util';

// lessonSrc/*/data.yml
const courseDataContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]data[.]yml$/);

/**
 * Get structure of courses with data from data.yml files
 * Currently, only external courses has a data.yml file, but this could change in the future.
 * External courses are courses that have 'isExternal' in data.yml.
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
const getCourses = memoize(
  () => {
    const courses = {};
    for (const key of courseDataContext.keys()) {
      const [/* ignore */, course] = key.match(/^[.][/]([^/]+)[/]data[.]yml$/);
      const {isExternal, tags} = courseDataContext(key);
      courses[course] = {isExternal, tags: cleanseTags(tags, key)};
    }
    return courses;
  }
);

/**
 * Get metadata structure for one course
 * @param {string} course E.g. 'scratch'
 * @returns {object} Metadata object, e.g.
 * {
 *   sExternal: true,
 *   tags: {
 *     topic: ['block_based', 'app'],
 *     subject: ['technology', 'programming'],
 *     grade: ['secondary', 'junior'],
 *   },
 * }
 */
const getCourseMetadata = (course) => getCourses()[course] || {};

/**
 * Check if a course is external
 * @param {string} course E.g. 'scratch'
 * @returns {boolean}
 */
const isCourseExternal = (course) => !!(getCourses()[course] || {})['isExternal'];

/**
 * Get a list of all the external courses. Sorted alphabetically.
 * @returns {string[]} An array of courses, e.g. ['kodegenet', 'khan_academy']
 */
export const getExternalCourses = memoize(
  () => Object.keys(getCourses()).filter(isCourseExternal).sort()
);

/**
 * Get tags for the course.
 *
 * @param {string} course E.g. 'kodegenet'
 * @returns {object} E.g.
 {
   topic: ['block_based', 'app'],
   subject: ['technology', 'programming'],
   grade: ['secondary', 'junior'],
 }
 */
export const getCourseTags = (course) => getCourseMetadata(course).tags || {};
