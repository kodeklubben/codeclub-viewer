import {readmeContext} from '../contexts';
import {getLessonData} from '../util';

const getLessonFrontmatter = (state, {course, lesson, file}) => {
  if (!file) { return {}; }
  const lessons = getLessonData();
  const lessonPath = `./${course}/${lesson}/${file}.md`;
  const isReadme = /README(_[a-z]{2})?/.test(file);
  return isReadme ? readmeContext(lessonPath).frontmatter : (lessons[lessonPath] || {});
};

export const getTitle = (state, params) => getLessonFrontmatter(state, params).title || '';

export const getLevel = (state, params) => getLessonFrontmatter(state, params).level || 0;

export const getTags = (state, params) => getLessonFrontmatter(state, params).tags || {};

export const getAuthorName = (state, params) => getLessonFrontmatter(state, params).author || '';

export const getTranslatorName = (state, params) => getLessonFrontmatter(state, params).translator || '';
