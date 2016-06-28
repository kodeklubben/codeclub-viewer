import {createSelector} from 'reselect';
import {capitalize, lessonHasAllTags} from '../util';

const getLessons = (state) => state.lessons;
const getFilter = (state) => state.filter;
const getIconContext = (state) => state.context.iconContext;

// Creates a list of courses with lessons that have tags matching the filter
export const getFilteredCourses = createSelector(
  [getFilter, getLessons, getIconContext],
  (filter={}, lessons={}, iconContext) => {

    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      const course = lesson.course;
      if(lessonHasAllTags(lesson, filter)) {
        if(res.hasOwnProperty(course)) res[course].lessons.push(lesson);
        else res[course] = {
          iconPath: iconContext('./' + course + '/logo-black.png'),
          lessons: [lesson],
          name: capitalize(course).replace('_', ' '),
          path: course
        };
      }
      return res;
    }, {});
  }
);
