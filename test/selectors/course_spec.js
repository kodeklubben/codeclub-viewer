import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getFilteredCourses} from '../../src/selectors/course';

describe('course selector', () => {
  describe('getFilteredCourses', () => {
    it('creates an object of courses', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          course: 'scratch',
          indexed: true,
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {
            platform: ['windows', 'mac'],
            category: ['create game'],
            subject: ['reading']
          },
          title: 'Asteroids'
        },
        './scratch/hei_verden/hei_verden': {
          author: 'Bill Gates',
          course: 'scratch',
          indexed: true,
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'browser'],
            category: ['create game', 'get started'],
            subject: ['physics']
          },
          title: 'Hei verden'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          course: 'python',
          indexed: true,
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'ios', 'linux'],
            category: ['create game', 'get started'],
            subject: ['math']
          },
          title: 'Hei verden'
        },
        './web/nettside/nettside': {
          author: 'Ola Nordmann',
          course: 'web',
          indexed: false,
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const iconContext = function (input) {
        return input;
      };

      deepFreeze(lessons);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(lessons, iconContext)).to.eql({
        python: {
          iconPath: './python/logo-black.png',
          lessonCount: 1,
          name: 'Python',
          path: 'python'
        },
        scratch: {
          iconPath: './scratch/logo-black.png',
          lessonCount: 2,
          name: 'Scratch',
          path: 'scratch'
        },
        web: {
          iconPath: './web/logo-black.png',
          lessonCount: 1,
          name: 'Web',
          path: 'web'
        }
      });
    });

    it('should create an empty object if lessons is undefined', () => {

      // TODO: Create testdata contexts
      // Create fake context
      const iconContext = function (input) {
        return input;
      };

      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(undefined, iconContext)).to.eql({});
    });

    it('should create an empty object if lessons is an empty array', () => {
      const lessons = {};
      const iconContext = function (input) {
        return input;
      };

      deepFreeze(lessons);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(lessons, iconContext)).to.eql({});
    });
  });
  
  describe('getFilteredExternalCourses', () => {
    //TODO: Create tests when course mock data is created
  });
});
