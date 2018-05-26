// TODO: Perhaps use code-splitting / react-loadable / bundle-loader or similar here.

import {getCourseFrontmatter} from './courseFrontmatter';

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
