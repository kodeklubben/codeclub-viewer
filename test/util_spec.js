import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  addTagToFilter,
  capitalize,
  cleanseTags,
  filterCourses,
  filterLessons,
  fixNonArrayTagList,
  lessonHasAllTags,
  mergeObjects,
  removeTagFromFilter
} from '../src/util';

describe('util', () => {

  describe('capitalize', () => {

    it('makes first letter in a string capital', () => {
      const text = 'a random string';

      expect(capitalize(text)).to.equal('A random string');
    });
  });

  describe('getTags', () => {

  });

  describe('getCourses', () => {

  });

  describe('filterCourses', () => {
    it('create a list courses with lessons matching filter', () => {
      const filter = {
        platform: {'windows': true, 'linux': false},
        category: {'create game': true}
      };
      const courses = [
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

      deepFreeze(courses);
      deepFreeze(filter);
      expect(filterCourses(courses, filter)).to.eql([
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
  });

  describe('filterLessons', () => {
    it('finds lessons that have tags matching the filter', () => {
      const filter = {
        platform: {'windows': true, 'linux': false},
        category: {'create game': true}
      };
      const lessons = [
        {
          name: 'lesson 1',
          tags: {
            platform: ['windows', 'mac'],
            category: ['create game'],
            subject: ['reading']
          }
        },
        {
          name: 'lesson 2',
          tags: {
            platform: ['mac'],
            category: ['create game'],
            subject: ['reading']
          }
        },
        {
          name: 'lesson 3',
          tags: {}
        },
        {
          name: 'lesson 4',
          tags: {
            platform: ['windows'],
            category: ['create game']
          }
        }
      ];

      deepFreeze(lessons);
      deepFreeze(filter);
      expect(filterLessons(lessons, filter)).to.eql([
        {
          name: 'lesson 1',
          tags: {
            platform: ['windows', 'mac'],
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
      ]);
    });
  });

  ///////////////////////////////////
  //////// HELPER FUNCTIONS /////////
  ///////////////////////////////////

  describe('cleanseTags', () => {
    it('fixes invalid tag lists and return array', () => {
      const dirtyTags = {
        platform: 'windows, mac,     browser',
        subject: 'physics, math',
        category: ['create game', 'create app'],
        created: 2016,
        nothing: []
      };
      deepFreeze(dirtyTags);
      expect(cleanseTags(dirtyTags, false)).to.eql({
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016']
      });
    });

    it('fixes invalid tag lists and return object', () => {
      const dirtyTags = {
        platform: 'windows, mac,     browser',
        subject: 'physics, math',
        category: ['create game', 'create app'],
        created: 2016,
        nothing: []
      };
      deepFreeze(dirtyTags);
      expect(cleanseTags(dirtyTags, true)).to.eql({
        platform: {
          'windows': false,
          'mac': false,
          'browser': false
        },
        subject: {
          'physics': false,
          'math': false
        },
        category: {
          'create game': false,
          'create app': false
        },
        created: {
          '2016': false
        }
      });
    });

    it('does not change already valid tag lists', () => {
      const validTags = {
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016']
      };
      deepFreeze(validTags);
      expect(cleanseTags(validTags, false)).to.eql({
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016']
      });
    });
  });

  describe('fixNonArrayTagList', () => {
    it('converts string to array', () => {
      const tagList = 'windows, mac,     browser';
      expect(fixNonArrayTagList(tagList)).to.eql([
        'windows', 'mac', 'browser'
      ]);
    });

    it('converts numbers to array of string(s)', () => {
      const tagList = 1234;
      expect(fixNonArrayTagList(tagList)).to.eql(['1234']);
    });

    it('converts null to empty array', () => {
      const tagList = null;
      expect(fixNonArrayTagList(tagList)).to.eql([]);
    });
  });

  describe('lessonHasAllTags', () => {
    it('return true if lesson has tags', () => {
      const tags = {
        platform: {'windows': true, 'linux': false},
        category: {'create game': true}
      };
      const lesson = {
        name: 'task1',
        tags: {
          platform: ['no-iPad', 'windows'],
          category: ['create game']
        }
      };

      deepFreeze(tags);
      deepFreeze(lesson);
      expect(lessonHasAllTags(lesson, tags)).to.equal(true);
    });

    it('return false if lesson does not have tags', () => {
      const tags = {
        platform: {'windows': true, 'ios': true, 'linux': false},
        category: {'create game': true, 'create app': false}
      };
      const lesson = {
        course: 'scratch',
        tags: {
          platform: ['no-iPad', 'windows'],
          category: ['create game']
        }
      };

      deepFreeze(tags);
      deepFreeze(lesson);
      expect(lessonHasAllTags(lesson, tags)).to.equal(false);
    });

    it('is not affected by object extension', () => {
      Object.prototype.hi = function(){console.log('muhahaha');};
      const tags = {
        platform: {'windows': true, 'linux': false},
        category: {'create game': true}
      };
      const lesson = {
        name: 'task1',
        tags: {
          platform: ['no-iPad', 'windows'],
          category: ['create game']
        }
      };

      deepFreeze(tags);
      deepFreeze(lesson);
      expect(lessonHasAllTags(lesson, tags)).to.equal(true);
    });

    it('return true filterTags is empty', () => {
      const tags = {};
      const lesson = {
        name: 'task1',
        tags: {
          platform: ['no-iPad', 'windows'],
          category: ['create game']
        }
      };
  
      deepFreeze(tags);
      deepFreeze(lesson);
      expect(lessonHasAllTags(lesson, tags)).to.equal(true);
    });

  });
});

