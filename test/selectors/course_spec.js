import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  getFilteredCourses,
  getTagFilteredExternalCourses,
  getFilteredExternalCoursesWithLanguages,
} from '../../src/selectors/course';

describe('[selectors/course.js] Selector', () => {
  describe('getFilteredCourses', () => {
    it('should return courses sorted by number of lessons', () => {
      const filteredLessons = {
        scratch: ['astrokatt', 'straffespark'],
        python: ['hangman'],
        microbit: ['python_hello_world', 'python_images', 'python_music'],
      };
      deepFreeze(filteredLessons);
      expect(getFilteredCourses.resultFunc(filteredLessons)).to.deep.equal(['microbit', 'scratch', 'python']);
    });

    it('should return no courses if there are no filtered lessons', () => {
      const filteredLessons = {};
      deepFreeze(filteredLessons);
      expect(getFilteredCourses.resultFunc(filteredLessons)).to.deep.equal([]);
    });
  });
  
  describe('getTagFilteredExternalCourses', () => {
    it('should return filtered external courses, sorted alphabetically', () => {
      const tagsFilter = {
        topic: {
          app: false,
          electronics: false,
          text_based: true,
          web: false,
          robot: false,
          animation: false,
        },
        subject: {
          mathematics: false,
          music: false,
          arts_and_crafts: false,
        },
        grade: {
          primary: false,
          secondary: true,
          junior: false,
        },
      };
      const expectedCourses = ['external_course', 'khan_academy', 'kodegenet', 'raspberry_pi', 'sonic_pi'];
      deepFreeze(tagsFilter);
      deepFreeze(expectedCourses);
      expect(getTagFilteredExternalCourses.resultFunc(tagsFilter)).to.deep.equal(expectedCourses);
    });

    it('should return all external courses if nothing is checked', () => {
      const tagsFilter = {
        topic: {
          app: false,
          electronics: false,
          text_based: false,
          web: false,
          robot: false,
          animation: false,
        },
        subject: {
          mathematics: false,
          music: false,
          arts_and_crafts: false,
        },
        grade: {
          primary: false,
          secondary: false,
          junior: false,
        },
      };
      const expectedCourses = [
        'codecademy',
        'external_course',
        'external_course_with_bad_tag',
        'external_course_with_empty_frontmatter',
        'external_course_without_external',
        'external_course_without_language',
        'external_course_without_tags',
        'external_course_without_title',
        'external_course_without_title_or_language',
        'khan_academy',
        'kodegenet',
        'kodeknekkerne',
        'raspberry_pi',
        'sonic_pi',
      ];
      deepFreeze(tagsFilter);
      deepFreeze(expectedCourses);
      expect(getTagFilteredExternalCourses.resultFunc(tagsFilter)).to.deep.equal(expectedCourses);
    });

    it('should return empty list if one unused tag (i.e. no course uses it) is checked ', () => {
      const tagsFilter = {
        topic: {
          unusedtag: true,
        },
      };
      const expectedCourses = [];
      deepFreeze(tagsFilter);
      deepFreeze(expectedCourses);
      expect(getTagFilteredExternalCourses.resultFunc(tagsFilter)).to.deep.equal(expectedCourses);
    });
  });

  describe('getFilteredExternalCoursesWithLanguages', () => {
    it('should return list corresponding to tagsfilter and languagefilter', () => {
      const filteredExternalCourses = [
        'codecademy',
        'external_course_with_empty_frontmatter',
        'external_course_without_external',
        'external_course_without_language',
        'external_course_without_title',
        'external_course_without_title_or_language',
        'external_course',
        'kodegenet',
        'kodeknekkerne',
        'raspberry_pi',
      ];
      const languageFilter = {
        nb: true,
        en: false,
        nn: true,
      };
      const expected = [
        {course: 'external_course_without_external', language: 'nb'},
        {course: 'external_course_without_title', language: 'nb'},
        {course: 'external_course', language: 'nb'},
        {course: 'external_course', language: 'nn'},
        {course: 'kodegenet', language: 'nb'},
        {course: 'kodeknekkerne', language: 'nb'},
      ];
      const actual = getFilteredExternalCoursesWithLanguages.resultFunc(filteredExternalCourses, languageFilter);
      deepFreeze(expected);
      deepFreeze(actual);
      expect(actual).to.deep.equal(expected);
    });

    it('should return an empty list if no languages are checked', () => {
      const filteredExternalCourses = [
        'codecademy',
        'external_course_with_empty_frontmatter',
        'external_course_without_external',
        'external_course_without_language',
        'external_course_without_title',
        'external_course_without_title_or_language',
        'external_course',
        'kodegenet',
        'kodeknekkerne',
        'raspberry_pi',
      ];
      const languageFilter = {
        nb: false,
        en: false,
        nn: false,
      };
      const expected = [];
      const actual = getFilteredExternalCoursesWithLanguages.resultFunc(filteredExternalCourses, languageFilter);
      deepFreeze(expected);
      deepFreeze(actual);
      expect(actual).to.deep.equal(expected);
    });

    it('should return an empty list if no courses remain after filtering', () => {
      const filteredExternalCourses = [];
      const languageFilter = {
        nb: true,
        en: true,
        nn: true,
      };
      const expected = [];
      const actual = getFilteredExternalCoursesWithLanguages.resultFunc(filteredExternalCourses, languageFilter);
      deepFreeze(expected);
      deepFreeze(actual);
      expect(actual).to.deep.equal(expected);
    });
  });
});
