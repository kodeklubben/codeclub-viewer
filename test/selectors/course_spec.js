import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getFilteredCourses} from '../../src/selectors/course';

describe('course selector', () => {
  describe('getFilteredCourses', () => {

    it('should create an object of courses based on lessons', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          course: 'scratch',
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
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };

      // TODO: Create testdata contexts
      // Create fake context
      const iconContext = function (input) {
        return input;
      };
      const playlists = {
        'intro': [
          {
            author: 'Bill Gates',
            course: 'scratch',
            level: 3,
            path: 'scratch/asteroids/asteroids',
            tags: {
              platform: ['windows', 'mac'],
              category: ['create game'],
              subject: ['reading']
            },
            title: 'Asteroids'
          },
          {
            author: 'Bill Gates',
            course: 'scratch',
            level: 1,
            path: 'scratch/hei_verden/hei_verden',
            tags: {
              platform: ['windows', 'browser'],
              category: ['create game', 'get started'],
              subject: ['physics']
            },
            title: 'Hei verden'
          }
        ],
        'advanced': [
          {
            author: 'Bill Gates',
            course: 'python',
            level: 1,
            path: 'python/adv/adv',
            tags: {
              platform: ['windows', 'browser'],
              category: ['create game', 'get started'],
              subject: ['physics']
            },
            title: 'Adv'
          }
        ]
      };

      deepFreeze(lessons);
      deepFreeze(playlists);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(lessons, playlists, iconContext)).to.eql({
        python: {
          iconPath: './python/logo-black.png',
          lessons: [
            {
              author: 'Ola Nordmann',
              course: 'python',
              level: 1,
              path: 'python/hei_verden/hei_verden',
              tags: {
                category: [
                  'create game',
                  'get started'
                ],
                platform: [
                  'windows',
                  'ios',
                  'linux'
                ],
                subject: [
                  'math'
                ]
              },
              title: 'Hei verden'
            }
          ],
          name: 'Python',
          path: 'python',
          playlists: {'advanced': [
            {
              author: 'Bill Gates',
              course: 'python',
              level: 1,
              path: 'python/adv/adv',
              tags: {
                platform: ['windows', 'browser'],
                category: ['create game', 'get started'],
                subject: ['physics']
              },
              title: 'Adv'
            }
          ]}
        },
        scratch: {
          iconPath: './scratch/logo-black.png',
          lessons: [
            {
              author: 'Bill Gates',
              course: 'scratch',
              level: 3,
              path: 'scratch/asteroids/asteroids',
              tags: {
                category: [
                  'create game'
                ],
                platform: [
                  'windows',
                  'mac'
                ],
                subject: [
                  'reading'
                ]
              },
              title: 'Asteroids'
            },
            {
              author: 'Bill Gates',
              course: 'scratch',
              level: 1,
              path: 'scratch/hei_verden/hei_verden',
              tags: {
                platform: ['windows', 'browser'],
                category: ['create game', 'get started'],
                subject: ['physics']
              },
              title: 'Hei verden'
            }
          ],
          name: 'Scratch',
          path: 'scratch',
          playlists: {'intro': [
            {
              author: 'Bill Gates',
              course: 'scratch',
              level: 3,
              path: 'scratch/asteroids/asteroids',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              },
              title: 'Asteroids'
            },
            {
              author: 'Bill Gates',
              course: 'scratch',
              level: 1,
              path: 'scratch/hei_verden/hei_verden',
              tags: {
                platform: ['windows', 'browser'],
                category: ['create game', 'get started'],
                subject: ['physics']
              },
              title: 'Hei verden'
            }
          ]}
        },
        web: {
          iconPath: './web/logo-black.png',
          lessons: [
            {
              author: 'Ola Nordmann',
              course: 'web',
              level: 2,
              path: 'web/nettside/nettside',
              tags: {},
              title: 'Nettside'
            }
          ],
          name: 'Web',
          path: 'web',
          playlists: {}
        }
      });
    });

    it('should create an empty object if lessons is undefined', () => {

      // TODO: Create testdata contexts
      // Create fake context
      const iconContext = function (input) {
        return input;
      };
      const playlists = {};

      deepFreeze(playlists);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(undefined, playlists, iconContext)).to.eql({});
    });

    it('should create an empty object if lessons is an empty array', () => {
      const lessons = {};
      const iconContext = function (input) {
        return input;
      };
      const playlists = {};

      deepFreeze(lessons);
      deepFreeze(playlists);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(lessons, playlists, iconContext)).to.eql({});
    });
  });
});
