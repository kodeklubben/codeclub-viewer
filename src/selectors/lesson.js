import {createSelector} from 'reselect';
import {constraintsNotInConstraintFilter, tagsContainAllTagsInFilter} from '../util';

const getLessons = (state) => state.lessons;
const getFilter = (state) => state.filter;
const getConstraintFilter = (state) => state.constraintFilter;

// Creates an object containing lessons that have tags matching the filter
export const getFilteredLessons = createSelector(
  [getConstraintFilter, getFilter, getLessons],
  (constraintFilter = {}, filter = {}, lessons = {}) => {
    
    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      const lessonHasAllTagsInFilter = tagsContainAllTagsInFilter(lesson.tags, filter);
      const lessonIsNotConstricted = constraintsNotInConstraintFilter(lesson.constraints, constraintFilter);
      if (lessonHasAllTagsInFilter && lessonIsNotConstricted) res[lessonKey] = lesson;
      return res;
    }, {});
    
  }
);
