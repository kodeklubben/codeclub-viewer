/* eslint-env node */
// TODO: Perhaps use code-splitting / react-loadable / bundle-loader or similar here.

import {getLessonFrontmatter} from './lessonFrontmatter';
import {dirname} from '../util';

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
  let lessonContent = getLessonContent(course, lesson, language, isReadme);
  let text, picture = '';
  lessonContent = lessonContent.substring(lessonContent.indexOf('<section class="intro"'));
  const p = lessonContent.indexOf('<p>');
  const closingP = lessonContent.indexOf('</p>');
  const img = lessonContent.indexOf('<img');
  const closingFig = lessonContent.indexOf('</figure');
  if (p < closingP) {
    text = lessonContent.substring(p, closingP);
    if (text.length > 300) {
      text = lessonContent.substring(p, 300) + '...';
    }
    picture = img < closingFig ? lessonContent.substring(img, closingFig) : '';
    // Add path to image. Regex allows for attributes with or without quotes, e.g. <img src="astrokatt.png" />,
    // <img src=astrokatt.png />, <img src=astrokatt.png/>, and <img src=astrokatt.png>
    picture = picture.replace(/( src="?)([^" />]*)([" />])/, '$1' + process.env.PUBLICPATH + dirname(path) + '/$2$3');
  }
  return (picture || '') + (text || '');
};
