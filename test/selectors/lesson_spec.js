import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getFilteredLessons} from '../../src/selectors/lesson';

describe('lesson selector', () => {
  describe('getFilteredLessons filtered by normal filter', () => {

    it('should create an object containing filtered lessons', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: [],
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
          constraints: [],
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
          constraints: [],
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
          constraints: [],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const constraintFilter = {};
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
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, lessons)).to.eql({
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          course: 'python',
          constraints: [],
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
          constraints: [],
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
          constraints: [],
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
          constraints: [],
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
          constraints: [],
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
          constraints: [],
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
          constraints: [],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const constraintFilter = {};

      deepFreeze(lessons);
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, undefined, lessons)).to.eql(lessons);
    });

    it('should create an object containing all lessons if filter is an empty object', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: [],
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
          constraints: [],
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
          constraints: [],
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
          constraints: [],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const constraintFilter = {};
      const filter = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, lessons)).to.eql(lessons);
    });

    it('should create an empty object if no lessons in any course match the filter', () => {
      const lessons = {
        'id0': {
          author: 'Bill Gates',
          constraints: [],
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
          constraints: [],
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
          constraints: [],
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
          constraints: [],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const constraintFilter = {};
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
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, lessons)).to.eql({});
    });

  });

  describe('getFilteredLessons handles empty/undefined lessons', () => {

    it('should create an empty object if lessons is undefined', () => {
      const constraintFilter = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
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


      deepFreeze(filter);
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, undefined)).to.eql({});
    });

    it('should create an empty array if lessons is an empty array', () => {
      const constraintFilter = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
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
      const lessons = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, lessons)).to.eql({});
    });

  });

  describe('getFilteredLessons filtered by constraint filter', () => {
    it('should create an object containing lessons filtered by constraint filter', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: ['not ipad'],
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {},
          title: 'Asteroids'
        },
        './scratch/hei_verden/hei_verden': {
          author: 'Bill Gates',
          constraints: ['only windows', 'costs money'],
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          constraints: [],
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './web/nettside/nettside': {
          author: 'Ola Nordmann',
          constraints: ['only browser'],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const constraintFilter = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const filter = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, lessons)).to.eql({
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: ['not ipad'],
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {},
          title: 'Asteroids'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          constraints: [],
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        }
      });
    });

    it('should create an object containing all lessons if constraint filter is undefined', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: ['not ipad'],
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {},
          title: 'Asteroids'
        },
        './scratch/hei_verden/hei_verden': {
          author: 'Bill Gates',
          constraints: ['only windows', 'costs money'],
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          constraints: [],
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './web/nettside/nettside': {
          author: 'Ola Nordmann',
          constraints: ['only browser'],
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
      expect(getFilteredLessons.resultFunc(undefined, filter, lessons)).to.eql({
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: ['not ipad'],
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {},
          title: 'Asteroids'
        },
        './scratch/hei_verden/hei_verden': {
          author: 'Bill Gates',
          constraints: ['only windows', 'costs money'],
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          constraints: [],
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './web/nettside/nettside': {
          author: 'Ola Nordmann',
          constraints: ['only browser'],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      });
    });

    it('should create an object containing all lessons if constraint filter is an empty object', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: ['not ipad'],
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {},
          title: 'Asteroids'
        },
        './scratch/hei_verden/hei_verden': {
          author: 'Bill Gates',
          constraints: ['only windows', 'costs money'],
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          constraints: [],
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './web/nettside/nettside': {
          author: 'Ola Nordmann',
          constraints: ['only browser'],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const constraintFilter = {};
      const filter = {};

      deepFreeze(lessons);
      deepFreeze(constraintFilter);
      deepFreeze(filter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, lessons)).to.eql({
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: ['not ipad'],
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {},
          title: 'Asteroids'
        },
        './scratch/hei_verden/hei_verden': {
          author: 'Bill Gates',
          constraints: ['only windows', 'costs money'],
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          constraints: [],
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './web/nettside/nettside': {
          author: 'Ola Nordmann',
          constraints: ['only browser'],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      });
    });

    it('should create an empty object if all lessons is constrained by constraint filter', () => {
      const lessons = {
        './scratch/asteroids/asteroids': {
          author: 'Bill Gates',
          constraints: ['not ipad'],
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {},
          title: 'Asteroids'
        },
        './scratch/hei_verden/hei_verden': {
          author: 'Bill Gates',
          constraints: ['only windows', 'costs money'],
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './python/hei_verden/hei_verden': {
          author: 'Ola Nordmann',
          constraints: ['not ipad'],
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {},
          title: 'Hei verden'
        },
        './web/nettside/nettside': {
          author: 'Ola Nordmann',
          constraints: ['only browser'],
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const constraintFilter = {
        'only windows': true,
        'not ipad': true,
        'costs money': true,
        'only browser': true
      };
      const filter = {};

      deepFreeze(lessons);
      deepFreeze(filter);
      deepFreeze(constraintFilter);
      expect(getFilteredLessons.resultFunc(constraintFilter, filter, lessons)).to.eql({});
    });
  });
});
