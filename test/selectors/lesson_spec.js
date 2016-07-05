import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getFilteredLessons} from '../../src/selectors/lesson';

describe('lesson selector', () => {
  describe('getFilteredLessons', () => {

    it('should create an object containing filtered lessons', () => {
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
        './python/hei_verden/hei_verden': {
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
        },
        './scratch/asteroids/asteroids': {
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
        }
      });
    });

    it('should create an object containing all lessons if filter is undefined', () => {
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

      deepFreeze(lessons);
      expect(getFilteredLessons.resultFunc(undefined, lessons)).to.eql(lessons);
    });

    it('should create an object containing all lessons if filter is an empty object', () => {
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
      const filter = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      expect(getFilteredLessons.resultFunc(filter, lessons)).to.eql(lessons);
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
          'math': true
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
});
