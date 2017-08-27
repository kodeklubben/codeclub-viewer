const getLessonFrontmatter = (state, {course, lesson, file}) => {
  if (!file) { return {}; }
  const {lessons, context} = state;
  const lessonPath = `./${course}/${lesson}/${file}.md`;
  const isReadme = /README(_[a-z]{2})?/.test(file);
  return isReadme ? context.readmeContext(lessonPath).frontmatter : lessons[lessonPath];
};

export const getTitle = (state, params) => getLessonFrontmatter(state, params).title || '';

export const getLevel = (state, params) => getLessonFrontmatter(state, params).level || 0;

export const getCourseIcon = (state, {course}) =>
  course ?
    state.context.iconContext('./' + course + '/logo-black.png') :
    null;
