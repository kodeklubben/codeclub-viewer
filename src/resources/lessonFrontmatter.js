import {assignDeep} from '../util';

// lessonSrc/*/*/*.md, only frontmatter (includes README-files, i.e. lærerveiledninger/teacher instructions)
// The keys are of the form './course/lesson/file.md'
// Note that this require.context should be identical to the one for lessonContent.js, except with 'frontmatter!'
const lessonFrontmatterContext =
  require.context('frontmatter!lessonSrc/', true, /^[.][/][^/]+[/][^/]+[/][^.]+[.]md$/);

const lessons = {};
// An example of the structure of lessons:
// const lessons = {
//   scratch: {
//     astrokatt: {
//       nn: {
//         0: {
//           title: 'Astrokatt',
//           level: 1,
//           author: 'Geir',
//           translator: 'Kari',
//           external: 'https://www.example.com/external', // doesn't always exist
//           url: '/scratch/astrokatt/astrokatt',
//           key: './scratch/astrokatt/astrokatt.md',
//         },
//         1: {
//           title: 'Lærerveiledning for Astrokatt',
//           level: 1,
//           author: 'Gro',
//           translator: 'Per',
//           url: '/scratch/astrokatt/README_nn',
//           key: './scratch/astrokatt/README_nn.md',
//         },
//       },
//       nb: {
//         /* ... */
//       },
//     },
//     straffespark: {
//       /* ... */
//     },
//     /* ... */
//   },
//   python: {
//     /* ... */
//   },
//   /* ... */
// };
for (const key of lessonFrontmatterContext.keys()) {
  const [/* ignore */, course, lesson, file] = key.match(/^[.][/]([^/]+)[/]([^/]+)[/]([^.]+)[.]md$/);
  const {language, title = '', level = 0, author = '', translator = '', external = ''} = lessonFrontmatterContext(key);
  if (language) {
    const isReadmeKey = file.startsWith('README') ? 1 : 0;
    const url = `/${course}/${lesson}/${file}`;
    const lessonData = {title, level, author, translator, external, url, key};
    assignDeep(lessons, [course, lesson, language, isReadmeKey], lessonData);
  } else {
    console.warn('The lesson', key, 'did not contain language, so lesson will not be used.');
  }
}

/**
 *
 * @param {string} course
 * @param {string} lesson
 * @param {string} language
 * @param {boolean} isReadme
 * @returns {object|{}} If lesson exists, returns the following structure:
 *   {
 *     title: 'Astrokatt',
 *     level: 1,
 *     author: 'Geir',
 *     translator: 'Kari',
 *     external: 'https://www.example.com/external',
 *     url: '/scratch/astrokatt/astrokatt_nn', // or '/scratch/astrokatt/README_nn'
 *   }
 */
export const getLessonFrontmatter = (course, lesson, language, isReadme) => {
  const isReadmeKey = isReadme ? 1 : 0;
  return (((lessons[course] || {})[lesson] || {})[language] || {})[isReadmeKey] || {};
};


/**
 * Get lessons in a course.
 *
 * NOTE: This method could potentially be implemented by lessonData.js instead,
 *       as long as we can be sure that all lessons have a data.yml file.
 *
 * @param {string} course Which course to get lessons for
 * @returns {string[]} An array of lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getLessonsInCourse = (course) => Object.keys(lessons[course] || {});

/**
 *
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @return {string[]} An array of languages this lesson exists in, e.g. ['nb', 'en']
 */
export const getLessonLanguages = (course, lesson) => Object.keys((lessons[course] || {})[lesson] || {});
