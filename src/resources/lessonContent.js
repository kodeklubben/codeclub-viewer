/* eslint-env node */
// TODO: Perhaps use code-splitting / react-loadable / bundle-loader or similar here.

import {getLessonFrontmatter} from './lessonFrontmatter';
import {extractFirstPartOfHtml} from '../util';

// lessonSrc/*/*/*.md, only frontmatter (includes README-files, i.e. lærerveiledninger/teacher instructions)
// The keys are of the form './course/lesson/file.md'
// Note that this require.context should be identical to the one for lessonFrontmatter.js, except without 'frontmatter!'
const lessonContentContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/][^/]+[/][^.]+[.]md$/);

/**
 * Return the HTML markup for the lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @return {string} HTML markup
 */
export const getLessonContent = (course, lesson, language, isReadme) => {
  const fm = getLessonFrontmatter(course, lesson, language, isReadme);
  return fm.key ? lessonContentContext(fm.key) : '';
};

/**
 * Get first part of HTML markup for the lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string} HTML code to e.g. display in a popover.
 */
export const getLessonIntro = (course, lesson, language, isReadme) => {
  const lessonContent = getLessonContent(course, lesson, language, isReadme);
  const url = getLessonFrontmatter(course, lesson, language, isReadme).url;
  return extractFirstPartOfHtml(lessonContent, url);
};
