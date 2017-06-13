import {createSelector} from 'reselect';
import {getFilteredAndIndexedLessons} from './lesson';
import {capitalize, tagsMatchFilter, cleanseTags} from '../util';

const getCourseContext = (state) => state.context.courseContext;
const getFilter = (state) => state.filter;
const getIconContext = (state) => state.context.iconContext;

// Creates a list of courses with lessons that have tags matching the filter
export const getFilteredCourses = createSelector(
  [getFilteredAndIndexedLessons, getIconContext],
  (lessons = {}, iconContext) => {
    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      const courseName = lesson.course;
      const name = capitalize(courseName).replace('_', ' ');

      // Increment lessonCount of existing course
      if (res.hasOwnProperty(courseName)) {res[courseName].lessonCount++;}
      // Or create a new course
      else res[courseName] = {
        iconPath: iconContext('./' + courseName + '/logo-black.png'),
        lessonCount: 1,
        name,
        path: courseName
      };

      return res;
    }, {});
  }
);

export const getFilteredExternalCourses = createSelector(
  [getCourseContext, getIconContext, getFilter],
  (courseContext, iconContext, filter = {}) => {
    return courseContext.keys().reduce((res, path) => {
      const coursePath = path.slice(0, path.indexOf('/', 2));
      const fm = courseContext(path).frontmatter;
      if (fm.external != null) {
        const course = {
          externalLink: fm.external,
          iconPath: iconContext(coursePath + '/logo-black.png'),
          name: fm.title,
          tags: fm.tags == null ? {} : cleanseTags(fm.tags)
        };
        return tagsMatchFilter(course.tags, filter) ? {...res, [fm.title]: course} : res;
      }
      return res;
    }, {});
  }
);
