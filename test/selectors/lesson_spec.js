import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  getFilteredLessons,
  getFilteredLessonCountPerLanguage,
  getFilteredLessonsInCourseForLevel,
  getFilteredLevelsInCourse,
} from '../../src/selectors/lesson';

describe('[selectors/lesson.js] Selector', () => {
  describe('getFilteredLessons', () => {
    it('should return all lessons with all languages checked (but no tags)', () => {
      const languageFilter = {
        nb: true,
        nn: true,
        en: true,
      };
      const tagsFilter = {};
      const actual = getFilteredLessons.resultFunc(languageFilter, tagsFilter);
      const expected = {
        elm: ['lessonA', 'lessonB', 'lessonC', 'lessonD', 'lessonE', 'lessonF', 'lessonG', 'lessonH'],
        scratch: ['lessonA', 'lessonB', 'lessonC', 'lessonD', 'lessonE', 'lessonF', 'lessonH'],
      };
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return all lessons in bokmål (with no tags checked)', () => {
      const languageFilter = {
        nb: true,
        nn: false,
        en: false,
      };
      const tagsFilter = {};
      const actual = getFilteredLessons.resultFunc(languageFilter, tagsFilter);
      const expected = {
        elm: ['lessonA', 'lessonB', 'lessonC', 'lessonD', 'lessonE', 'lessonF'],
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
  });

  describe('getFilteredLessonCountPerLanguage', () => {
    it('should return full lesson count for one course', () => {
      const lessons = {
        elm: ['lessonA', 'lessonB', 'lessonC', 'lessonD', 'lessonE', 'lessonF', 'lessonG', 'lessonH'],
      };
      const filterLanguages = ['nb', 'nn', 'en'];
      const actual = getFilteredLessonCountPerLanguage.resultFunc(lessons, filterLanguages);
      const expected = {
        elm: {
          nb: 6,
          en: 3,
          nn: 2,
        },
      };
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return correct lesson count for one course', () => {
      const lessons = {
        elm: ['lessonA', 'lessonC', 'lessonD', 'lessonE', 'lessonF', 'lessonG', 'lessonH'],
      };
      const filterLanguages = ['nb', 'en'];
      const actual = getFilteredLessonCountPerLanguage.resultFunc(lessons, filterLanguages);
      const expected = {
        elm: {
          nb: 5,
          en: 3,
        },
      };
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return empty object when all lessons removed by filter, only one course', () => {
      const lessons = {
        elm: [],
      };
      const filterLanguages = ['nb', 'nn', 'en'];
      const actual = getFilteredLessonCountPerLanguage.resultFunc(lessons, filterLanguages);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return empty object since no languages checked in filter, only one course', () => {
      const lessons = {
        elm: ['lessonA', 'lessonB', 'lessonC', 'lessonD', 'lessonE', 'lessonF', 'lessonG', 'lessonH'],
      };
      const filterLanguages = [];
      const actual = getFilteredLessonCountPerLanguage.resultFunc(lessons, filterLanguages);
      const expected = {};
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return only one course when the other has no lessons', () => {
      const lessons = {
        elm: ['lessonA', 'lessonC', 'lessonD', 'lessonE', 'lessonF', 'lessonG', 'lessonH'],
        python: [],
      };
      const filterLanguages = ['nb', 'en'];
      const actual = getFilteredLessonCountPerLanguage.resultFunc(lessons, filterLanguages);
      const expected = {
        elm: {
          nb: 5,
          en: 3,
        }
      };
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('getFilteredLessonsInCourseForLevel', () => {
    it('should return all level 2 scratch lessons', () => {
      const lessons = [
        'lessonA',
        'lessonB',
        'lessonC',
        'lessonD',
        'lessonE',
        'lessonF',
        'lessonG',
        'lessonH',
        'lessonI',
        'lessonJ',
        'lessonK',
      ];
      const course = 'scratch';
      const level = 2;
      const actual = getFilteredLessonsInCourseForLevel.resultFunc(lessons, course, level);
      const expected = ['lessonB', 'lessonF', 'lessonJ'];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return no lessons if all lessons filtered away', () => {
      const lessons = [];
      const course = 'scratch';
      const level = 2;
      const actual = getFilteredLessonsInCourseForLevel.resultFunc(lessons, course, level);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return no lessons if using unused level', () => {
      const lessons = [
        'lessonA',
        'lessonB',
        'lessonC',
        'lessonD',
        'lessonE',
        'lessonF',
        'lessonG',
        'lessonH',
        'lessonI',
        'lessonJ',
        'lessonK',
      ];
      const course = 'scratch';
      const level = 8;
      const actual = getFilteredLessonsInCourseForLevel.resultFunc(lessons, course, level);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('getFilteredLevelsInCourse', () => {
    it('should return all levels', () => {
      const lessons = [
        'lessonA',
        'lessonB',
        'lessonC',
        'lessonD',
        'lessonE',
        'lessonF',
        'lessonG',
        'lessonH',
        'lessonI',
        'lessonJ',
        'lessonK',
      ];
      const course = 'scratch';
      const actual = getFilteredLevelsInCourse.resultFunc(lessons, course);
      const expected = [1, 2, 3, 4];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return only a few levels', () => {
      const lessons = [
        'lessonC',
        'lessonD',
        'lessonG',
        'lessonH',
        'lessonK',
      ];
      const course = 'scratch';
      const actual = getFilteredLevelsInCourse.resultFunc(lessons, course);
      const expected = [3, 4];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });

    it('should return no levels', () => {
      const lessons = [];
      const course = 'scratch';
      const actual = getFilteredLevelsInCourse.resultFunc(lessons, course);
      const expected = [];
      deepFreeze(actual);
      deepFreeze(expected);
      expect(actual).to.deep.equal(expected);
    });
  });
});
