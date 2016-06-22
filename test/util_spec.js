import {expect} from 'chai';

import {
  addTagToFilter,
  capitalize,
  cleanseTags,
  filterCourses,
  filterLessons,
  fixNonArrayTagList,
  lessonHasTags,
  mergeObjects,
  removeTagFromFilter
} from '../src/util';

describe('util', () => {

  describe('capitalize', () => {

    it('makes first letter in a string capital', () => {
      const text = 'a random string';

      expect(capitalize(text)).to.equal('A random string');
    });

    it('is pure', () => {
      const text = 'a random string';
      capitalize(text);

      expect(text).to.equal('a random string');
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

      expect(mergeObjects(objA, objB)).to.eql({
        listA: ['item1', 'item2', 'item3', 'item4'],
        listB: ['item4', 'item5'],
        listC: ['item6', 'item7'],
        listD: ['item8']
      });
    });

    it('is pure', () => {
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
      mergeObjects(objA, objB);

      expect(objA).to.eql({
        listA: ['item1', 'item2', 'item3'],
        listB: ['item4', 'item5'],
        listC: []
      });
      expect(objB).to.eql({
        listA: ['item2', 'item3', 'item4'],
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

      expect(addTagToFilter(tag, filter)).to.eql({
        platform: ['browser', 'windows'],
        subject: ['physics']
      });
    });

    it('is pure', () => {
      const tag = {
        platform: ['windows']
      };
      const filter = {
        platform: ['browser'],
        subject: ['physics']
      };
      addTagToFilter(tag, filter);

      expect(tag).to.eql({
        platform: ['windows']
      });
      expect(filter).to.eql({
        platform: ['browser'],
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

      expect(removeTagFromFilter(tag, filter)).to.eql({
        platform: ['windows'],
        subject: ['physics']
      });
    });

    it('is pure', () => {
      const tag = {
        platform: ['windows']
      };
      const filter = {
        platform: ['windows', 'browser'],
        subject: ['physics']
      };
      removeTagFromFilter(tag, filter);

      expect(tag).to.eql({
        platform: ['windows']
      });
      expect(filter).to.eql({
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

    it('is pure', () => {
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
      filterCourses(courses, filter);

      expect(filter).to.eql({
        platform: ['windows'],
        category: ['create game']
      });
      expect(courses).to.eql([
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

    it('is pure', () => {
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
      filterLessons(lessons, filter);

      expect(filter).to.eql({
        platform: ['windows'],
        category: ['create game']
      });
      expect(lessons).to.eql([
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
        created: 2016
      };
      expect(cleanseTags(dirtyTags)).to.eql({
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016']
      });
    });

    it('does not change valid tag lists', () => {
      const validTags = {
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016']
      };
      expect(cleanseTags(validTags)).to.eql({
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016']
      });
    });

    it('is pure', () => {
      const dirtyTags = {
        platform: 'windows, mac,     browser',
        subject: 'physics, math',
        category: ['create game', 'create app'],
        created: 2016
      };
      cleanseTags(dirtyTags);
      expect(dirtyTags).to.eql({
        platform: 'windows, mac,     browser',
        subject: 'physics, math',
        category: ['create game', 'create app'],
        created: 2016
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

    it('is pure', () => {
      const tagList = 'windows, mac,     browser';
      fixNonArrayTagList(tagList);
      expect(tagList).to.eql('windows, mac,     browser');

      const tagListNumber = 1234;
      fixNonArrayTagList(tagListNumber);
      expect(tagListNumber).to.equal(1234);
    });
  });

  describe('lessonHasTags', () => {
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

      expect(lessonHasTags(lesson, tags)).to.equal(true);
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

      expect(lessonHasTags(lesson, tags)).to.equal(false);
    });

    it('is pure', () => {
      const tags = {
        platform: ['windows'],
        category: ['create game']
      };
      const lesson = {
        course: 'scratch',
        tags: {
          platform: ['no-iPad', 'windows'],
          category: ['create game']
        }
      };
      lessonHasTags(lesson, tags);

      expect(tags).to.eql({
        platform: ['windows'],
        category: ['create game']
      });
      expect(lesson).to.eql({
        course: 'scratch',
        tags: {
          platform: ['no-iPad', 'windows'],
          category: ['create game']
        }
      });
    });
  });

});

