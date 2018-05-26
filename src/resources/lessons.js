import {tagsMatchFilter} from '../util';
import {getLessonsInCourse} from './lessonFrontmatter';
import {getLessonTags} from './lessonData';

/**
 * Get lessons in a course, potentially filtered. Any language in the filter is ignored.
 * @param {string} course Which course to get lessons for
 * @param {object} filter E.g. {topic: {game: false, animation: true}, subject: {mathematics: false, english: true}}}
 * @returns {array} An array of lessons for the given course, e.g. ['astrokatt', 'straffespark']
 */
export const getFilteredLessonsInCourse = (course, filter = {}) => {
  const lessonMatchesFilter = (lesson) => tagsMatchFilter(getLessonTags(course, lesson), filter);
  return getLessonsInCourse(course).filter(lessonMatchesFilter);
};
