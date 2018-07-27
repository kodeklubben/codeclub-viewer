import memoize from 'fast-memoize';
import {assignDeep, cleanseTags} from '../util';

// lessonSrc/*/*/lesson.yml
const lessonsContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/][^/]+[/]lesson[.]yml$/);

/**
 * Get language independent data on all lessons from lesson.yml files.
 * @returns {object} An object of lessons, e.g.
 * {
 *   scratch: {
 *     astrokatt: {
 *       indexed: false, // true unless 'indexed: false' explicitly exists in lesson.yml
 *       level: 1,
 *       license: '[cc-by-sa 3.0](http://creativecommons.org/licenses/by-sa/3.0/)'
 *       tags: {
 *         topic: ['block_based', 'app'],
 *         subject: ['technology', 'programming'],
 *         grade: ['secondary', 'junior'],
 *       }
 *     },
 *     straffespark: {
 *       ...
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
    const lessons = {};
    for (const key of lessonsContext.keys()) {
      const [/* ignore */, course, lesson] = key.match(/^[.][/]([^/]+)[/]([^/]+)[/]lesson[.]yml$/);
      const {level, license, tags, indexed} = lessonsContext(key);
      const data = {level, license, tags: cleanseTags(tags, key), indexed: indexed !== false};
      assignDeep(lessons, [course, lesson], data);
    }
    return lessons;
  }
);


/**
 * Return tags for this lesson.
 * @param {string} course
 * @param {string} lesson
 * @returns {object} A Metadata object, e.g. {
    indexed: false,
    tags: {
      topic: ['block_based', 'app'],
      subject: ['technology', 'programming'],
      grade: ['secondary', 'junior'],
    }
  }
  Note that 'indexed' key might be missing, in which case it is assumed to be true.
  If 'indexed' === false it means that this lesson will only show up in the playlists (oppgavesamlinger)
 */
const getLessonMetadata = (course, lesson) => (getData()[course] || {})[lesson] || {};

/**
 * Get lesson tags (without language included)
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @returns {object} A lessonTags object, e.g.
 * {
 *   topic: ['block_based', 'app'],
 *   subject: ['technology', 'programming'],
 *   grade: ['secondary', 'junior'],
 * }
 */
export const getLessonTags = (course, lesson) => getLessonMetadata(course, lesson).tags;

/**
 * Whether or not a lesson is indexed, i.e. if it should be shown when displaying filtered lessons per level
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @returns {boolean} Whether or not the lesson is indexed
 */
export const isLessonIndexed = (course, lesson) => getLessonMetadata(course, lesson).indexed;

/**
 * Get license for lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @returns {string} The license for the lesson. Defaults to '', if course, lesson or license was not found
 */
export const getLicense = (course, lesson) => ((getData()[course] || {})[lesson] || {}).license || '';

/**
 * Get level for lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @returns {number} The level of the lesson. Defaults to 0 if course, lesson or level was not found.
 */
export const getLevel = (course, lesson) => ((getData()[course] || {})[lesson] || {}).level || 0;

/**
 * Get lessons in a course, sorted alphabetically. Will return all lessons that have a lesson.yml file.
 * @param {string} course E.g. 'scratch'
 * @returns {string[]} An array of lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getLessonsInCourse = memoize(course => Object.keys(getData()[course] || {}).sort());
