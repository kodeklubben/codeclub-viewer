import memoize from 'fast-memoize';
import {assignDeep, cleanseTags} from '../util';

// lessonSrc/*/*/data.yml
const lessonDataContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/][^/]+[/]data[.]yml$/);

/**
 * Get structure of lessons with data from data.yml files
 * @returns {object} An object of lessons, e.g.
 * {
 *   scratch: {
 *     astrokatt: {
 *       indexed: false, // true unless 'indexed: false' explicitly exists in data.yml
 *       level: 1,
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
const getLessons = memoize(
  () => {
    const lessons = {};
    for (const key of lessonDataContext.keys()) {
      const [/* ignore */, course, lesson] = key.match(/^[.][/]([^/]+)[/]([^/]+)[/]data[.]yml$/);
      const {level, tags, indexed} = lessonDataContext(key);
      const data = {level, tags: cleanseTags(tags, key), indexed: indexed !== false};
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
const getLessonMetadata = (course, lesson) => (getLessons()[course] || {})[lesson] || {};

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

export const isLessonIndexed = (course, lesson) => getLessonMetadata(course, lesson).indexed;

// /**
//  * Get all lessons in a course, sorted by level.
//  * @param {string} course E.g. 'scratch'
//  * @returns {object} An object with level as keys and array of lessons as value, e.g.
//  * {
//  *   1: ['astrokatt', 'straffespark', ...]
//  *   2: [...]
//  *   ...
//  * }
//  */
// export const getLessonsByLevel = memoize(
//   (course) => {
//     const lessonsByLevel = {};
//     const lessonsInCourse = getLessons()[course] || {};
//     for (const lesson of Object.keys(lessonsInCourse)) {
//       const level = lessonsInCourse[lesson].level;
//       if (level != null) {
//         if (!lessonsByLevel[level]) {
//           lessonsByLevel[level] = [];
//         }
//         lessonsByLevel[level].push(lesson);
//       }
//     }
//     return lessonsByLevel;
//   }
// );

// /**
//  * Get all lessons in a course given a level.
//  * @param {string} course E.g. 'scratch'
//  * @param {string|number} level E.g. '1'
//  * @returns {string[]} Array of lessons, e.g. ['scratch', 'astrokatt', ...]
//  */
// export const getLessonsInLevel = (course, level) => (getLessonsByLevel(course) || {})[level] || [];

// /**
//  * Get all levels that exists for a given course.
//  * @param {string} course E.g. 'scratch'
//  * @returns {string[]} An array of all levels, sorted, e.g. ['1', '2', '3', '4']
//  */
// export const getLessonLevels = memoize(
//   (course) => Object.keys(getLessonsByLevel(course)).sort()
// );

/**
 * Get level for lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @returns {number} The level of the lesson. Defaults to 0 if course, lesson or level was not found.
 */
export const getLessonLevel = (course, lesson) => ((getLessons()[course] || {})[lesson] || {}).level || 0;

/**
 * Get lessons in a course. Will return all lessons that have a data.yml file.
 * @param {string} course E.g. 'scratch'
 * @returns {string[]} An array of lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getLessonsInCourse = memoize(
  course => Object.keys(getLessons()[course] || {})
);
