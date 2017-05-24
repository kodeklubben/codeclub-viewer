import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  getFilteredLessons,
  getFilteredAndIndexedLessons,
  getLessonsByLevel,
} from '../../src/selectors/lesson';

const lessonAsteroids = {
  author: 'Bill Gates',
  course: 'scratch',
  level: 3,
  path: 'scratch/asteroids/asteroids',
  indexed: true,
  tags: {
    platform: ['windows', 'mac'],
    category: ['create game'],
    subject: ['reading']
  },
  title: 'Asteroids'
};

const lessonHeiVerden = {
  author: 'Bill Gates',
  course: 'scratch',
  level: 1,
  path: 'scratch/hei_verden/hei_verden',
  indexed: false,
  tags: {
    platform: ['windows', 'browser'],
    category: ['create game', 'get started'],
    subject: ['physics']
  },
  title: 'Hei verden'
};

const lessonPyHeiVerden = {
  author: 'Ola Nordmann',
  course: 'python',
  level: 1,
  path: 'python/hei_verden/hei_verden',
  indexed: true,
  tags: {
    platform: ['windows', 'ios', 'linux'],
    category: ['create game', 'get started'],
    subject: ['math']
  },
  title: 'Hei verden'
};

const lessonNettside = {
  author: 'Ola Nordmann',
  course: 'web',
  level: 2,
  path: 'web/nettside/nettside',
  indexed: false,
  tags: {},
  title: 'Nettside'
};

describe('lesson selector', () => {
  describe('getFilteredLessons', () => {

    it('should create an object containing filtered lessons', () => {
      const lessons = {
        [`./${lessonAsteroids.path}`]: lessonAsteroids,
        [`./${lessonHeiVerden.path}`]: lessonHeiVerden,
        [`./${lessonPyHeiVerden.path}`]: lessonPyHeiVerden,
        [`./${lessonNettside.path}`]: lessonNettside,
      };
      const filter = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': false}
      };

      deepFreeze(lessons);
      deepFreeze(filter);
      expect(getFilteredLessons.resultFunc(filter, lessons)).to.eql({
        [`./${lessonAsteroids.path}`]: lessonAsteroids,
        [`./${lessonHeiVerden.path}`]: lessonHeiVerden,
        [`./${lessonPyHeiVerden.path}`]: lessonPyHeiVerden,
      });
    });

    it('should create an object containing all lessons if filter is undefined', () => {
      const lessons = {
        [`./${lessonAsteroids.path}`]: lessonAsteroids,
        [`./${lessonHeiVerden.path}`]: lessonHeiVerden,
        [`./${lessonPyHeiVerden.path}`]: lessonPyHeiVerden,
        [`./${lessonNettside.path}`]: lessonNettside,
      };
      deepFreeze(lessons);
      expect(getFilteredLessons.resultFunc(undefined, lessons)).to.eql(lessons);
    });

    it('should create an object containing all lessons if filter is an empty object', () => {
      const lessons = {
        [`./${lessonAsteroids.path}`]: lessonAsteroids,
        [`./${lessonHeiVerden.path}`]: lessonHeiVerden,
        [`./${lessonPyHeiVerden.path}`]: lessonPyHeiVerden,
        [`./${lessonNettside.path}`]: lessonNettside,
      };
      const filter = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      expect(getFilteredLessons.resultFunc(filter, lessons)).to.eql(lessons);
    });

    it('should create an empty object if no lessons in any course match the filter', () => {
      const lessons = {
        'id0': lessonAsteroids,
        'id1': lessonHeiVerden,
        'id2': {
          ...lessonPyHeiVerden,
          tags: {...lessonPyHeiVerden.tags, subject: ['science']}
        },
        'id3': lessonNettside,
      };
      const filter = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {
          'reading': false,
          'math': true
        }
      };

      deepFreeze(lessons);
      deepFreeze(filter);
      expect(getFilteredLessons.resultFunc(filter, lessons)).to.eql({});
    });

    it('should create an empty object if lessons is undefined', () => {
      const filter = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {
          'reading': false,
          'science': true
        }
      };


      deepFreeze(filter);
      expect(getFilteredLessons.resultFunc(filter, undefined)).to.eql({});
    });

    it('should create an empty array if lessons is an empty array', () => {
      const filter = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {
          'reading': false,
          'math': true
        }
      };
      const lessons = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      expect(getFilteredLessons.resultFunc(filter, lessons)).to.eql({});
    });


  });

  describe('getFilteredAndIndexedLessons', () => {

    it('should create an object only containing indexed lessons', () => {

      const lessons = {
        [`./${lessonAsteroids.path}`]: lessonAsteroids,
        [`./${lessonHeiVerden.path}`]: lessonHeiVerden,
        [`./${lessonPyHeiVerden.path}`]: lessonPyHeiVerden,
        [`./${lessonNettside.path}`]: lessonNettside,
      };

      deepFreeze(lessons);
      expect(getFilteredAndIndexedLessons.resultFunc(lessons)).to.eql({
        [`./${lessonAsteroids.path}`]: lessonAsteroids,
        [`./${lessonPyHeiVerden.path}`]: lessonPyHeiVerden,
      });
    });

    it('should create an empty object if lessons is undefined', () => {
      expect(getFilteredAndIndexedLessons.resultFunc(undefined)).to.eql({});
    });

    it('should create an empty array if lessons is an empty array', () => {
      const lessons = {};

      deepFreeze(lessons);
      expect(getFilteredAndIndexedLessons.resultFunc(lessons)).to.eql({});
    });

  });


  describe('getLessonsByLevel', () => {

    it('should group lessons by level', () => {
      const lessons = {
        [`./${lessonAsteroids.path}`]: lessonAsteroids,
        [`./${lessonHeiVerden.path}`]: lessonHeiVerden,
        [`./${lessonPyHeiVerden.path}`]: lessonPyHeiVerden,
        [`./${lessonNettside.path}`]: lessonNettside,
      };
      deepFreeze(lessons);
      expect(getLessonsByLevel.resultFunc(lessons)).to.eql({
        1: [lessonHeiVerden, lessonPyHeiVerden],
        2: [lessonNettside],
        3: [lessonAsteroids],
      });

    });

  });

});
