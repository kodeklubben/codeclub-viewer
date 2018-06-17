import memoize from 'fast-memoize';
import {assignDeep} from '../util';

// lessonSrc/*/*/*.md, only frontmatter (includes README-files, i.e. lærerveiledninger/teacher instructions)
// The keys are of the form './course/lesson/file.md'
// Note that this require.context should be identical to the one for lessonContent.js, except with 'frontmatter!'
const lessonFrontmatterContext =
  require.context('!!json-loader!front-matter-loader?onlyAttributes!lessonSrc/',
    true, /^[.][/][^/]+[/][^/]+[/][^.]+[.]md$/);


/**
 * Returns a structure with all the lessons and teacher instructions.
 * @returns {object} E.g.
 * {
 *   scratch: {
 *     astrokatt: {
 *       nn: {
 *         0: {
 *           title: 'Astrokatt',
 *           level: 1,
 *           author: 'Geir',
 *           translator: 'Kari',
 *           external: 'https://www.example.com/external', // doesn't always exist
 *           path: '/scratch/astrokatt/astrokatt',
 *           pdfPath: '/scratch/astrokatt/astrokatt.pdf',
 *           key: './scratch/astrokatt/astrokatt.md',
 *         },
 *         1: {
 *           title: 'Lærerveiledning for Astrokatt',
 *           level: 1,
 *           author: 'Gro',
 *           translator: 'Per',
 *           path: '/scratch/astrokatt/README_nn',
 *           pdfPath: '/scratch/astrokatt/README_nn.pdf',
 *           key: './scratch/astrokatt/README_nn.md',
 *         },
 *       },
 *       nb: {
 *         ...
 *       },
 *     },
 *     straffespark: {
 *       ...
 *     },
 *     ...
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
    for (const key of lessonFrontmatterContext.keys()) {
      const [/* ignore */, course, lesson, file] = key.match(/^[.][/]([^/]+)[/]([^/]+)[/]([^.]+)[.]md$/);
      const {
        language, title = '', level = 0, author = '', translator = '', external = ''
      } = lessonFrontmatterContext(key);
      if (language) {
        const isReadmeKey = file.startsWith('README') ? 1 : 0;
        const path = `/${course}/${lesson}/${file}`; // TODO: Add publicpath?
        const pdfPath = `${path}.pdf`;
        const lessonData = {title, level, author, translator, external, path, pdfPath, key};
        assignDeep(lessons, [course, lesson, language, isReadmeKey], lessonData);
      } else {
        console.warn('The lesson', key, 'did not contain language, so lesson will not be used.');
      }
    }
    return lessons;
  }
);

/**
 * Convert file (given course and lesson) to language and isReadme.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} file E.g. 'astrokatt_nn' or 'README_nn'
 * @returns {object|null} If lesson exists an object with the structure {language: 'nn', isReadme: false}
 *                   otherwise null.
 */
export const getLanguageAndIsReadme = (course, lesson, file) => {
  const path = `./${course}/${lesson}/${file}.md`;
  if (lessonFrontmatterContext.keys().includes(path)) {
    return {
      language: lessonFrontmatterContext(path).language || '',
      isReadme: file.startsWith('README'),
    };
  } else {
    return null;
  }
};

/**
 * Whether the given lesson exists (either normal lesson or teacher instructions)
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} file E.g. 'astrokatt_nn' or 'README_nn'
 * @returns {boolean}
 */
export const isValidLesson = (course, lesson, file) => {
  const path = `./${course}/${lesson}/${file}.md`;
  return lessonFrontmatterContext.keys().includes(path);
};

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
 *     path: '/scratch/astrokatt/astrokatt_nn', // or '/scratch/astrokatt/README_nn'
 *   }
 */
export const getLessonFrontmatter = (course, lesson, language, isReadme) => {
  const isReadmeKey = isReadme ? 1 : 0;
  return (((getLessons()[course] || {})[lesson] || {})[language] || {})[isReadmeKey] || {};
};


// export const getLessonpath = (course, lesson, language, isReadme) =>
//   getLessonFrontmatter(course, lesson, language, isReadme).path;

/**
 * Get lessons in a course.
 *
 * NOTE: This method could potentially be implemented by lessonData.js instead,
 *       as long as we can be sure that all lessons have a data.yml file.
 *
 * @param {string} course Which course to get lessons for
 * @returns {string[]} An array of lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getLessonsInCourse = memoize(
  course => Object.keys(getLessons()[course] || {})
);

/**
 *
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @return {string[]} An array of languages this lesson exists in, e.g. ['nb', 'en']
 */
export const getLessonLanguages = (course, lesson) => Object.keys((getLessons()[course] || {})[lesson] || {});

/**
 * Whether or not a lesson is translated to a specific language.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @returns {boolean}
 */
export const isLessonTranslated = (course, lesson, language) => getLessonLanguages(course, lesson).includes(language);
