// TODO: Perhaps use code-splitting / react-loadable / bundle-loader or similar here.

import {getCourseFrontmatter} from './courseFrontmatter';
import {dirname} from '../util';
import {getLessonContent} from './lessonContent';

// lessonSrc/*/index*.md, only frontmatter
// The keys are of the form './course/index*.md'
// Note that this require.context should be identical to the one for courseFrontmatter.js, except without 'frontmatter!'
const courseContentContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]index[^.]*[.]md$/);

/**
 * Return the HTML markup for the course info.
 * @param {string} course E.g. 'scratch'
 * @param {string} language E.g. 'nb'
 * @return {string} HTML markup
 */
export const getCourseInfo = (course, language) => {
  const fm = getCourseFrontmatter(course, language);
  return fm.key ? courseContentContext(fm.key) : '';
};

/**
 * Get first part of HTML markup for the lesson.
 * @param {string} course E.g. 'scratch'
 * @param {string} lesson E.g. 'astrokatt'
 * @param {string} language E.g. 'nb'
 * @param {boolean} isReadme
 * @returns {string} HTML code to e.g. display in a popover.
 */
// TODO: This is very similar to getLessonIntro. Perhaps separate out similar code?
export const getCourseIntro = (course, language) => {
  let courseContent = getCourseInfo(course, language);
  let text, picture = '';
  courseContent = courseContent.substring(courseContent.indexOf('<section class="intro"'));
  const p = courseContent.indexOf('<p>');
  const closingP = courseContent.indexOf('</p>');
  const img = courseContent.indexOf('<img');
  const closingFig = courseContent.indexOf('</figure');
  if (p < closingP) {
    text = courseContent.substring(p, closingP);
    if (text.length > 300) {
      text = courseContent.substring(p, 300) + '...';
    }
    picture = img < closingFig ? courseContent.substring(img, closingFig) : '';
    // Add path to image. Regex allows for attributes with or without quotes, e.g. <img src="astrokatt.png" />,
    // <img src=astrokatt.png />, <img src=astrokatt.png/>, and <img src=astrokatt.png>
    picture = picture.replace(/( src="?)([^" />]*)([" />])/, '$1' + process.env.PUBLICPATH + dirname(path) + '/$2$3');
  }
  return (picture || '') + (text || '');
};
