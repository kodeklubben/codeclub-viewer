//import {courseContext, readmeContext, lessonContext, courseAllLangsContext, lessonAllContext} from './contexts';
import {
  courseAllLangsContext,
  getCourseMetadata,
  getLessonMetadata,
  getLessonFrontmatter,
  isValidLessonPath,
  lessonPaths,
  lessonNoReadmePaths,
} from './contexts';
import {cleanseTags, dirname, getAvailableLanguages} from './util';


let cachedLessons = null;
export function getLessonData() {
  if (cachedLessons == null) {
    const paths = lessonNoReadmePaths;
    const availableLanguages = getAvailableLanguages();

    cachedLessons = paths.reduce((res, path) => {
      const lessonFrontmatter = getLessonFrontmatter(path);
      const language = lessonFrontmatter.language;
      if (!language) {
        console.warn('Skipping lesson ' + path + ' since it is missing language.');
        return res;
      }
      if (!availableLanguages.includes(language)) {
        // Hiding lesson since it uses a language that is not available (yet)
        if (typeof document === 'undefined') { // Only show message when rendering on server
          console.log('NOTE: The lesson ' + path + ' uses the language ' + language +
            ', which is not available. Skipping lesson.');
        }
        return res;
      }

      // Course name is between './' and second '/'
      //const courseName = path.slice(2, path.indexOf('/', 2)).toLowerCase();

      const lessonMetaPath = dirname(path);
      const courseMetaPath = dirname(lessonMetaPath);

      // Inherit tags from course, override with lessonTags, and add lessonTag
      const courseTags = cleanseTags(getCourseMetadata(courseMetaPath).tags, 'course ' + courseMetaPath);
      const lessonTags = cleanseTags(getLessonMetadata(lessonMetaPath).tags, 'lesson ' + lessonMetaPath);
      const languageTag = language ? {language: [language]} : {};
      const tags = {...courseTags, ...lessonTags, ...languageTag};

      // Gets the valid readmePath for the lesson, if it exists
      const readmePath = getReadmePath(language, path);

      res[path] = {
        title: lessonFrontmatter.title || '',
        author: lessonFrontmatter.author || '',
        translator: lessonFrontmatter.translator || '',
        level: lessonFrontmatter.level,
        indexed: lessonFrontmatter.indexed == null ? true : lessonFrontmatter.indexed,
        external: lessonFrontmatter.external || '',
        readmePath,
        //course: coursePath.slice(1).toLowerCase(), // cut off first '/'
        language,
        tags,
        path,
      };

      return res;
    }, {});
  }
  return cachedLessons;
}


/**
 * Returns /course/index_(ISO_CODE) if it exists, returns /course/index if not.
 **/
export function getCourseInfoMarkup(courseName, language) {
  const req = courseAllLangsContext;
  const withLanguage = `./${courseName}/index_${language}.md`;
  const withoutLanguage = `./${courseName}/index.md`;

  const hasValidFile = (path) => {
    if (!req.keys().includes(path)) { return false; }
    const courseLanguage = req(path).frontmatter.language;
    if (!courseLanguage) {
      console.warn('Not using course info ' + path + ' since it is missing language.');
      return false;
    }
    return courseLanguage === language;
  };
  const createMarkupFrom = (path) => ({__html: req(path).content});

  for (const path of [withLanguage, withoutLanguage]) {
    if (hasValidFile(path)) {
      return createMarkupFrom(path);
    }
  }

  console.warn('The course ' + courseName + ' has no course info (index.js) in language ' + language);
  return null;
}



/**
 * Checks if a lesson with a given path has a README-file.
 * Accepts README-files on the form /README or /README_(ISO_CODE).
 **/
const getReadmePath = (language, lessonPath) => {
  lessonPath = lessonPath.slice(0, lessonPath.lastIndexOf('/'));
  const readmePathAndLanguageCode = lessonPath + '/README_' + language;
  const readmePathNoLanguageCode = lessonPath + '/README';

  const hasValidFile = (path) => {
    if (!isValidLessonPath(path)) { return false; }
    const readmeLanguage = getLessonFrontmatter(path).language;
    if (!readmeLanguage) {
      console.warn('Not using README ' + path + ' since it is missing language.');
      return false;
    }
    return (readmeLanguage === language);
  };

  for (const path of [readmePathAndLanguageCode, readmePathNoLanguageCode]) {
    if (hasValidFile(path)) {
      return path;
    }
  }

  // If the lesson has no README (teacher instruction), just return an empty string.
  return '';
};


/**
 * Returns the readmePath of a lesson with the given lessonPath
 *
 * @param {String} lessonPath
 * @returns {String|undefined}
 */
export const getReadmepathFromLessonpath = (lessonPath) => {
  const lessons = getLessonData();
  for(let key of Object.keys(lessons)){
    if(lessons[key].readmePath === lessonPath){
      return lessons[key].external === '' ? lessonPath : undefined;
    }
  }
};

/**
 * Returns the path for the language in state if task is another language
 *
 * @param {String} path
 * @param {String} language
 * @param {boolean} isReadme
 * @returns {String|null}
 */
export const getPathForMainLanguage = (path, language, isReadme) => {
  const lessonLanguage = getLessonFrontmatter(path).language;
  if (lessonLanguage !== language) {
    const lessonFolder = path.substring(0, path.lastIndexOf('/'));
    for (const lessonPath of lessonPaths) {
      if (isReadme === lessonPath.includes('README')) {
        if (lessonPath.startsWith(lessonFolder)) {
          if (getLessonFrontmatter(lessonPath).language === language) {
            return lessonPath;
          }
        }
      }
    }
  }
  return null;
};
