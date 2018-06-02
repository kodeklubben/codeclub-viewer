import {assignDeep, cleanseTags} from '../util';

// lessonSrc/*/*/data.yml
const lessonDataContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/][^/]+[/]data[.]yml$/);

// TODO: We must include "indexed" in data.yml for the new pages,
// TODO: but not remove it from frontmatter in the old ones,
// TODO: or else they will break.

let cachedLessons = null;
// An example of the structure of lessons:
// const lessons = {
//   scratch: {
//     astrokatt: {
//       indexed: false, // true unless 'indexed: false' explicitly exists in data.yml
//       tags: {
//         topic: ['block_based', 'app'],
//         subject: ['technology', 'programming'],
//         grade: ['secondary', 'junior'],
//       }
//     },
//     straffespark: {
//       /* ... */
//     },
//   },
//   python: {
//     /* ... */
//   },
//   /* ... */
// };
// TODO: Make this a function, and change 'lessons' to 'cachedLessons'
const getCachedLessons = () => {
  if (cachedLessons == null) {
    cachedLessons = {};
    for (const key of lessonDataContext.keys()) {
      const [/* ignore */, course, lesson] = key.match(/^[.][/]([^/]+)[/]([^/]+)[/]data[.]yml$/);
      const {tags, indexed} = lessonDataContext(key);
      const data = {tags: cleanseTags(tags, key), indexed: indexed !== false};
      assignDeep(cachedLessons, [course, lesson], data);
    }
  }
  return cachedLessons;
};


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
const getLessonMetadata = (course, lesson) => (getCachedLessons()[course] || {})[lesson] || {};

export const getLessonTags = (course, lesson) => getLessonMetadata(course, lesson).tags;

export const isLessonIndexed = (course, lesson) => getLessonMetadata(course, lesson).indexed;
