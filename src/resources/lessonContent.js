/* eslint-env node */
// TODO: Perhaps use code-splitting / react-loadable / bundle-loader or similar here.

import {getLessonFrontmatter} from './lessonFrontmatter';
import {extractFirstPartOfHtml} from '../util';

// Gets all lessonSrc/*/*/*.md except lessonSrc/*/playlists/*
// Gets only frontmatter (includes README-files, i.e. lærerveiledninger/teacher instructions)
// The keys are of the form './course/lesson/file.md'
// Note that the regex should be identical to the one for lessonFrontmatter.js.
const lessonContentContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/](?!playlists[/])[^/]+[/][^.]+[.]md$/);

/**
 * Return the HTML markup for the lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @return {string} HTML markup
 */
export const getLessonContent = (course, lesson, language, isReadme) => {
  const {key} = getLessonFrontmatter(course, lesson, language, isReadme);
  return key ? lessonContentContext(key) : '';
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
  const {path} = getLessonFrontmatter(course, lesson, language, isReadme);
  return extractFirstPartOfHtml(lessonContent, path);
};

/**
 * Get the text in the first part of HTML markup for the lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string} Text to e.g. display in a description.
 */
export const getLessonIntroText = (course, lesson, language, isReadme) => {
  let content = '';
  content = getLessonIntro(course, lesson, language, isReadme).replace(/<[^>]*>?/g, '');
  return content;
};
