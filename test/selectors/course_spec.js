import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getCourses} from '../../src/selectors/course';

describe('course selector', () => {
  describe('getCourses', () => {
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
      const playlists = {
        'intro': [
          {
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
          {
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
          }
        ],
        'advanced': [
          {
            author: 'Bill Gates',
            course: 'python',
            indexed: true,
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
      expect(getCourses(lessons, playlists, iconContext)).to.eql({
        python: {
          iconPath: './python/logo-black.png',
          lessons: [
            {
              author: 'Ola Nordmann',
              course: 'python',
              indexed: true,
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
          playlists: {
            'advanced': [
              {
                author: 'Bill Gates',
                course: 'python',
                indexed: true,
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
          }
        },
        scratch: {
          iconPath: './scratch/logo-black.png',
          lessons: [
            {
              author: 'Bill Gates',
              course: 'scratch',
              indexed: true,
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
              indexed: true,
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
          playlists: {
            'intro': [
              {
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
              {
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
              }
            ]
          }
        },
        web: {
          iconPath: './web/logo-black.png',
          lessons: [
            {
              author: 'Ola Nordmann',
              course: 'web',
              indexed: false,
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

    it('creates an object of courses with empty playlists if playlists is undefined', () => {
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
      expect(getCourses(lessons, undefined, iconContext)).to.eql({
        python: {
          iconPath: './python/logo-black.png',
          lessons: [
            {
              author: 'Ola Nordmann',
              course: 'python',
              indexed: true,
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
          playlists: {}
        },
        scratch: {
          iconPath: './scratch/logo-black.png',
          lessons: [
            {
              author: 'Bill Gates',
              course: 'scratch',
              indexed: true,
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
              indexed: true,
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
          playlists: {}
        },
        web: {
          iconPath: './web/logo-black.png',
          lessons: [
            {
              author: 'Ola Nordmann',
              course: 'web',
              indexed: false,
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
      expect(getCourses(undefined, playlists, iconContext)).to.eql({});
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
      expect(getCourses(lessons, playlists, iconContext)).to.eql({});
    });
  });
  
  describe('getFilteredExternalCourses', () => {
    //TODO: Create tests when course mock data is created
  });
});
