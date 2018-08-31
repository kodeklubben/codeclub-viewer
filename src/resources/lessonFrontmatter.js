import memoize from 'fast-memoize';
import {assignDeep} from '../utils/util';
import {isLesson} from './lessons';

// Gets all lessonSrc/*/*/*.md except lessonSrc/*/playlists/*
// Gets only frontmatter (includes README-files, i.e. lærerveiledninger/teacher instructions)
// The keys are of the form './course/lesson/file.md'
// Note that the regex should be identical to the one for lessonContent.js.
const lessonFrontmatterContext =
  require.context('!!json-loader!front-matter-loader?onlyAttributes!lessonSrc/',
    true, /^[.][/][^/]+[/](?!playlists[/])[^/]+[/][^.]+[.]md$/);


/**
 * Get language dependent data for all lessons and teacher instructions based on the index*.md files.
 * @returns {object} E.g.
 * {
 *   scratch: {
 *     astrokatt: {
 *       nn: {
 *         0: {
 *           title: 'Astrokatt',
 *           author: 'Geir',
 *           translator: 'Kari',
 *           external: 'https://www.example.com/external', // doesn't always exist
 *           path: '/scratch/astrokatt/astrokatt',
 *           key: './scratch/astrokatt/astrokatt.md',
 *         },
 *         1: {
 *           title: 'Lærerveiledning for Astrokatt',
 *           author: 'Gro',
 *           translator: 'Per',
 *           path: '/scratch/astrokatt/README_nn',
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
const getData = memoize(
  () => {
    const lessons = {};
    for (const key of lessonFrontmatterContext.keys()) {
      const [/* ignore */, course, lesson, file] = key.match(/^[.][/]([^/]+)[/]([^/]+)[/]([^.]+)[.]md$/);
      if (isLesson(course, lesson)) {
        const {
          language, title = '', author = '', translator = '', external = ''
        } = lessonFrontmatterContext(key);
        if (!title) { console.warn('WARNING: The lesson', key, 'did not specify title.'); }
        if (language) {
          const isReadmeKey = file.startsWith('README') ? 1 : 0;
          const path = `/${course}/${lesson}/${file}`;
          const lessonData = {title, author, translator, external, path, key};
          assignDeep(lessons, [course, lesson, language, isReadmeKey], lessonData);
        } else {
          console.warn('WARNING: The lesson', key, 'did not specify language, so lesson will not be used.');
        }
      } else {
        console.warn(`WARNING: The lesson ${course}/${lesson}/${file} did not have a lesson.yml file, skipping...`);
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
 *
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {object|{}} If lesson exists, returns the following structure:
 *   {
 *     title: 'Astrokatt',
 *     author: 'Geir',
 *     translator: 'Kari',
 *     external: 'https://www.example.com/external',
 *     path: '/scratch/astrokatt/astrokatt_nn', // or '/scratch/astrokatt/README_nn'
 *   }
 */
const getLessonFrontmatter = (course, lesson, language, isReadme) => {
  const isReadmeKey = isReadme ? 1 : 0;
  return (((getData()[course] || {})[lesson] || {})[language] || {})[isReadmeKey] || {};
};

/**
 * If key exists for lesson, return key
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string}
 */
export const getLessonKey = (course, lesson, language, isReadme) => {
  const key = getLessonFrontmatter(course, lesson, language, isReadme).key;
  if (!key) {
    throw Error(`key does not exist for ${course}/${lesson}/${language}/${isReadme}`);
  }
  return key;
};

/**
 * If title exists for lesson, return title
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string|''}
 */
export const getLessonTitle = (course, lesson, language, isReadme) =>
  getLessonFrontmatter(course, lesson, language, isReadme).title || '';

/**
 * If author exists for lesson, return author
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string|''}
 */
export const getLessonAuthor = (course, lesson, language, isReadme) =>
  getLessonFrontmatter(course, lesson, language, isReadme).author || '';

/**
 * If translator exists for lesson, return translator
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string|''}
 */
export const getLessonTranslator = (course, lesson, language, isReadme) =>
  getLessonFrontmatter(course, lesson, language, isReadme).translator || '';

/**
 * If external exists lesson, return external
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string|''}
 */
export const getLessonExternal = (course, lesson, language, isReadme) =>
  getLessonFrontmatter(course, lesson, language, isReadme).external || '';

/**
 * If path exists for lesson, return path
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string}
 */
export const getLessonPath = (course, lesson, language, isReadme) =>
  getLessonFrontmatter(course, lesson, language, isReadme).path;


/**
 *
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @return {string[]} An array of languages this lesson exists in, e.g. ['nb', 'en']
 */
export const getLessonLanguages = (course, lesson) => {
  const lessonObj = (getData()[course] || {})[lesson] || {};
  // Only return languages where the lesson is defined, and not only the README:
  return Object.keys(lessonObj).filter(language => lessonObj[language][0]);
};

/**
 * Whether or not a lesson is translated to a specific language.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @returns {boolean}
 */
export const isLessonTranslated = (course, lesson, language) => getLessonLanguages(course, lesson).includes(language);
