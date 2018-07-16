import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  getFilteredLessons,
  getFilteredLessonsInCourseCountPerLanguage,
  getFilteredLessonsInCourseForLevel,
  getFilteredLevelsInCourse,
} from '../../src/selectors/lesson';

describe('[selectors/lesson.js] Selector', () => {
  describe('getFilteredLessons', () => {
    it('should return all lessons in bokmål (with no tags checked)', () => {
      const languageFilter = {
        nb: true,
        nn: false,
        en: false,
      };
      const tagsFilter = {};
      const actual = getFilteredLessons.resultFunc(languageFilter, tagsFilter);
      const expected = {
        course_with_empty_frontmatter: [],
        course_without_language: [],
        course_without_title: [],
        elm: ['lessonA', 'lessonB', 'lessonC', 'lessonD', 'lessonE', 'lessonF'],
        fake_internal_course: [],

        scratch: ['lessonA', 'lessonB', 'lessonC', 'lessonD', 'lessonE', 'lessonF', 'lessonH'],
      };
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return no lessons since no languages checked', () => {
      const languageFilter = {
        nb: false,
        nn: false,
        en: false,
      };
      const tagsFilter = {};
      const actual = getFilteredLessons.resultFunc(languageFilter, tagsFilter);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const languageFilter = {
        nb: true,
        nn: false,
        en: true,
      };
      const tagsFilter = {};
      const actual = getFilteredLessons.resultFunc(languageFilter, tagsFilter);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const languageFilter = {};
      const tagsFilter = {};
      const actual = getFilteredLessons.resultFunc(languageFilter, tagsFilter);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('getFilteredLessonsInCourseCountPerLanguage', () => {
    it('', () => {
      const course = '';
      const lessons = [];
      const filterLanguages = [];
      const actual = getFilteredLessonsInCourseCountPerLanguage.resultFunc(course, lessons, filterLanguages);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const course = '';
      const lessons = [];
      const filterLanguages = [];
      const actual = getFilteredLessonsInCourseCountPerLanguage.resultFunc(course, lessons, filterLanguages);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const course = '';
      const lessons = [];
      const filterLanguages = [];
      const actual = getFilteredLessonsInCourseCountPerLanguage.resultFunc(course, lessons, filterLanguages);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('getFilteredLessonsInCourseForLevel', () => {
    it('', () => {
      const lessons = [];
      const course = '';
      const level = 0;
      const actual = getFilteredLessonsInCourseForLevel.resultFunc(lessons, course, level);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const lessons = [];
      const course = '';
      const level = 0;
      const actual = getFilteredLessonsInCourseForLevel.resultFunc(lessons, course, level);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const lessons = [];
      const course = '';
      const level = 0;
      const actual = getFilteredLessonsInCourseForLevel.resultFunc(lessons, course, level);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('getFilteredLevelsInCourse', () => {
    it('', () => {
      const lessons = [];
      const course = '';
      const actual = getFilteredLevelsInCourse.resultFunc(lessons, course);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const lessons = [];
      const course = '';
      const actual = getFilteredLevelsInCourse.resultFunc(lessons, course);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('', () => {
      const lessons = [];
      const course = '';
      const actual = getFilteredLevelsInCourse.resultFunc(lessons, course);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });
  });
});
