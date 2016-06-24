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

  describe('mergeObjects', () => {

    it('merges object by combining lists as a set of all items', () => {
      const objA = {
        listA: ['item1', 'item2', 'item3'],
        listB: ['item4', 'item5'],
        listC: []
      };
      const objB = {
        listA: ['item2', 'item3', 'item4'],
        listC: ['item6', 'item7'],
        listD: ['item8']
      };
      
      deepFreeze(objA);
      deepFreeze(objB);
      expect(mergeObjects(objA, objB)).to.eql({
        listA: ['item1', 'item2', 'item3', 'item4'],
        listB: ['item4', 'item5'],
        listC: ['item6', 'item7'],
        listD: ['item8']
      });
    });
  });

  describe('addTagToFilter', () => {

    it('merges tag into filter', () => {
      const tag = {
        platform: ['windows']
      };
      const filter = {
        platform: ['browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(addTagToFilter(tag, filter)).to.eql({
        platform: ['browser', 'windows'],
        subject: ['physics']
      });
    });
  });

  describe('removeTagFromFilter', () => {
    it('removes tag from filter', () => {
      const tag = {
        platform: ['browser']
      };
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows'],
        subject: ['physics']
      });
    });
    
    it('it removes nothing if tag is an empty object', () => {
      const tag = {};
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows', 'browser'],
        subject: ['physics']
      });
    });

    it('removes nothing if tagItem does not exist in filter', () => {
      const tag = {
        platform: ['mac']
      };
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows', 'browser'],
        subject: ['physics']
      });
    });

    it('removes nothing if tagGroup does not exist in filter', () => {
      const tag = {
        group: ['windows']
      };
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows', 'browser'],
        subject: ['physics']
      });
    });
    
    it('removes nothing if tag contains more than one tagGroup', () => {
      const tag = {
        platform: ['windows'],
        subject: ['physics']
      };
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows', 'browser'],
        subject: ['physics']
      });
    });

    it('removes nothing if tag contains more than one tagItem', () => {
      const tag = {
        platform: ['windows', 'browser']
      };
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows', 'browser'],
        subject: ['physics']
      });
    });

    it('removes nothing if tag contains zero tagItems', () => {
      const tag = {
        group: []
      };
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };

      deepFreeze(tag);
      deepFreeze(filter);
      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows', 'browser'],
        subject: ['physics']
      });
    });

  });

  describe('filterCourses', () => {
    it('create a list courses with lessons matching filter', () => {
      const filter = {
        platform: ['windows'],
        category: ['create game']
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
        platform: ['windows'],
        category: ['create game']
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
    it('fixes invalid tag lists', () => {
      const dirtyTags = {
        platform: 'windows, mac,     browser',
        subject: 'physics, math',
        category: ['create game', 'create app'],
        created: 2016,
        nothing: []
      };
      deepFreeze(dirtyTags);
      expect(cleanseTags(dirtyTags)).to.eql({
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016']
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
      expect(cleanseTags(validTags)).to.eql({
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
        platform: ['windows'],
        category: ['create game']
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
        platform: ['windows', 'ios'],
        category: ['create game']
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
        platform: ['windows'],
        category: ['create game']
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

