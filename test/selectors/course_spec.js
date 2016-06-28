import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getFilteredCourses} from '../../src/selectors/course';

describe('course selector', () => {
  describe('getFilteredCourses', () => {

    it('should create a list of courses with lessons matching the filter', () => {
      const allCourses = [
        {
          name: 'scratch',
          lessons: [
            {
              name: 'lesson 1',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        },
        {
          name: 'python',
          lessons: [
            {
              name: 'lesson 2',
              tags: {
                platform: ['mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        },
        {
          name: 'web',
          lessons: [
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        }
      ];
      const filter = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': false}
      };

      deepFreeze(allCourses);
      deepFreeze(filter);
      expect(getFilteredCourses.resultFunc(filter, allCourses)).to.eql([
        {
          name: 'scratch',
          lessons: [
            {
              name: 'lesson 1',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              }
            }
          ]
        },
        {
          name: 'python',
          lessons: [
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        }
      ]);
    });

    it('should create a list of all courses with all lessons if filter is undefined', () => {
      const allCourses = [
        {
          name: 'scratch',
          lessons: [
            {
              name: 'lesson 1',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        },
        {
          name: 'python',
          lessons: [
            {
              name: 'lesson 2',
              tags: {
                platform: ['mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        },
        {
          name: 'web',
          lessons: [
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        }
      ];

      deepFreeze(allCourses);
      expect(getFilteredCourses.resultFunc(undefined, allCourses)).to.eql(allCourses);
    });

    it('should create a list of all courses with all lessons if filter is an empty object', () => {
      const allCourses = [
        {
          name: 'scratch',
          lessons: [
            {
              name: 'lesson 1',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        },
        {
          name: 'python',
          lessons: [
            {
              name: 'lesson 2',
              tags: {
                platform: ['mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        },
        {
          name: 'web',
          lessons: [
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        }
      ];
      const filter = {};

      deepFreeze(allCourses);
      deepFreeze(filter);
      expect(getFilteredCourses.resultFunc(filter, allCourses)).to.eql(allCourses);
    });
    
    it('should create empty array if no lessons in any course match the filter', () => {
      const allCourses = [
        {
          name: 'scratch',
          lessons: [
            {
              name: 'lesson 1',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        },
        {
          name: 'python',
          lessons: [
            {
              name: 'lesson 2',
              tags: {
                platform: ['mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        },
        {
          name: 'web',
          lessons: [
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        }
      ];
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

      deepFreeze(allCourses);
      deepFreeze(filter);
      expect(getFilteredCourses.resultFunc(filter, allCourses)).to.eql([]);
    });

    it('should create empty array if allCourses state is undefined', () => {
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
      expect(getFilteredCourses.resultFunc(filter)).to.eql([]);
    });

    it('should create empty array if allCourses is an empty array', () => {
      const allCourses = [];
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

      deepFreeze(allCourses);
      deepFreeze(filter);
      expect(getFilteredCourses.resultFunc(filter, allCourses)).to.eql([]);
    });
  });
});
