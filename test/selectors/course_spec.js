import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getFilteredCourses} from '../../src/selectors/course';

describe('course selector', () => {
  describe('getFilteredCourses', () => {

    it('should create an object of courses with lessons matching the filter', () => {
      const lessons = {
        'id0': {
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
        'id1': {
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
        'id2': {
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
        'id3': {
          author: 'Ola Nordmann',
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const filter = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': false}
      };
      const iconContext = function (input) {
        return input;
      };

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(filter, lessons, iconContext)).to.eql({
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
          path: 'python'

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
          path: 'scratch'

        }
      });
    });

    it('should create an object of all courses with all lessons if filter is undefined', () => {
      const lessons = {
        'id0': {
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
        'id1': {
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
        'id2': {
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
        'id3': {
          author: 'Ola Nordmann',
          course: 'web',
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
      expect(getFilteredCourses.resultFunc(undefined, lessons, iconContext)).to.eql({
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
          path: 'python'

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
          path: 'scratch'

        },
        web: {
          iconPath: './web/logo-black.png',
          lessons: [{
            author: 'Ola Nordmann',
            course: 'web',
            level: 2,
            path: 'web/nettside/nettside',
            tags: {},
            title: 'Nettside'
          }],
          name: 'Web',
          path: 'web'
        }
      });
    });

    it('should create an object of all courses with all lessons if filter is an empty object', () => {
      const lessons = {
        'id0': {
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
        'id1': {
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
        'id2': {
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
        'id3': {
          author: 'Ola Nordmann',
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const iconContext = function (input) {
        return input;
      };
      const filter = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(filter, lessons, iconContext)).to.eql({
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
          path: 'python'

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
          path: 'scratch'

        },
        web: {
          iconPath: './web/logo-black.png',
          lessons: [{
            author: 'Ola Nordmann',
            course: 'web',
            level: 2,
            path: 'web/nettside/nettside',
            tags: {},
            title: 'Nettside'
          }],
          name: 'Web',
          path: 'web'
        }
      });
    });

    it('should create an empty object if no lessons in any course match the filter', () => {
      const lessons = {
        'id0': {
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
        'id1': {
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
        'id2': {
          author: 'Ola Nordmann',
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'ios', 'linux'],
            category: ['create game', 'get started'],
            subject: ['science']
          },
          title: 'Hei verden'
        },
        'id3': {
          author: 'Ola Nordmann',
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
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
      const iconContext = function (input) {
        return input;
      };

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(filter, lessons, iconContext)).to.eql({});
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
          'math': true
        }
      };
      const iconContext = function (input) {
        return input;
      };

      deepFreeze(filter);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(filter, undefined, iconContext)).to.eql({});
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
      const iconContext = function (input) {
        return input;
      };

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(iconContext);
      expect(getFilteredCourses.resultFunc(filter, lessons, iconContext)).to.eql({});
    });
  });
});
