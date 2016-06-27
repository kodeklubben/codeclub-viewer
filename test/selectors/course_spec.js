import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getFilteredCourses} from '../../src/selectors/course';

describe('course selector', () => {
  describe('getFilteredCourses', () => {

    it('should create a list of courses with lessons matching the filter', () => {
      const state = {};

      state.allCourses = [
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

      state.filter = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': false}
      };

      deepFreeze(state);
      expect(getFilteredCourses(state)).to.eql([
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
      const state = {};

      state.allCourses = [
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

      deepFreeze(state);
      expect(getFilteredCourses(state)).to.eql([
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
      ]);
    });

    it('should create a list of all courses with all lessons if filter is an empty object', () => {
      const state = {};
      state.allCourses = [
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
      state.filter = {};

      deepFreeze(state);
      expect(getFilteredCourses(state)).to.eql([
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
      ]);
    });
    
    it('should create empty array if no lessons in any course match the filter', () => {
      const state = {};
      state.allCourses = [
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
      state.filter = {
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

      deepFreeze(state);
      expect(getFilteredCourses(state)).to.eql([]);
    });

    it('should create empty array if allCourses state is undefined', () => {
      const state = {};
      state.filter = {
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
      
      deepFreeze(state);
      expect(getFilteredCourses(state)).to.eql([]);
    });

    it('should create empty array if allCourses is an empty array', () => {
      const state = {};
      state.allCourses = [];
      state.filter = {
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

      deepFreeze(state);
      expect(getFilteredCourses(state)).to.eql([]);
    });
  });
});
