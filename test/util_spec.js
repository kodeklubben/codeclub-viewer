import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  arrayIntersection,
  capitalize,
  cleanseTags,
  fixNonArrayTagList,
  mergeTags,
  tagsMatchFilter,
  getFilterWithOnlyCheckedTags
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

  ///////////////////////////////////
  //////// HELPER FUNCTIONS /////////
  ///////////////////////////////////

  describe('cleanseTags', () => {
    it('fixes invalid tag lists and return array', () => {
      const dirtyTags = {
        platform: 'windows, mac,     browser',
        subject: 'physics, math',
        CAtegOry: ['create game', 'create app'],
        created: 2016,
        nothing: [],
        someTag: ['Tag1', 'tag2']
      };
      deepFreeze(dirtyTags);
      expect(cleanseTags(dirtyTags, false)).to.eql({
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'math'],
        category: ['create game', 'create app'],
        created: ['2016'],
        sometag: ['tag1', 'tag2']
      });
    });

    it('fixes invalid tag lists and return object', () => {
      const dirtyTags = {
        platform: 'windows, mac,     browser',
        subject: 'physics, math',
        category: ['create game', 'create app'],
        created: 2016,
        nothing: [],
        someTag: ['Tag1', 'tag2']
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
        },
        sometag: {'tag1': false, 'tag2': false}
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

  describe('getFilterWithOnlyCheckedTags', () => {
    it('returns empty object if filter is empty', () => {
      const filter = {};

      deepFreeze(filter);
      expect(getFilterWithOnlyCheckedTags(filter)).to.eql({});
    });

    it('removes all unchecked tags from filter', () => {
      const filter = {
        'platform': {
          'android': false,
          'linux': true,
          'mac': false,
          'windows': true
        },
        'subject': {
          'math': false,
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': true
        }
      };

      deepFreeze(filter);
      expect(getFilterWithOnlyCheckedTags(filter)).to.eql({
        'platform': {
          'linux': true,
          'windows': true
        },
        'subject': {
          'physics': true
        },
        'category': {
          'create app': true,
          'robots': true
        }
      });
    });
  });

  describe('arrayIntersection', () => {
    it('gets only identical items', () => {
      const arrA = ['item1', 'item2', 'item3', 'item4'];
      const arrB = ['item3', 'item4', 'item5'];

      deepFreeze(arrA);
      deepFreeze(arrB);
      expect(arrayIntersection(arrA, arrB)).to.eql(['item3', 'item4']);
    });
  });

  describe('mergeTags', () => {
    it('merges tags from A and B', () => {
      const tagsA = {
        'platform': {
          'android': false,
          'linux': true
        },
        'subject': {
          'math': false,
          'physics': true
        },
        'category': {
          'create app': true
        }
      };
      const tagsB = {
        'platform': {
          'linux': true,
          'windows': true
        },
        'subject': {
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': true
        }
      };

      deepFreeze(tagsA);
      deepFreeze(tagsB);
      expect(mergeTags(tagsA, tagsB)).to.eql({
        'platform': {
          'android': false,
          'linux': true,
          'windows': true
        },
        'subject': {
          'math': false,
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': true
        }
      });
    });

    it('returns all tags in B if A is empty', () => {
      const tagsA = {};
      const tagsB = {
        'platform': {
          'linux': true,
          'windows': true
        },
        'subject': {
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': true
        }
      };

      deepFreeze(tagsA);
      deepFreeze(tagsB);
      expect(mergeTags(tagsA, tagsB)).to.eql(tagsB);
    });

    it('returns all tags in A if B is empty', () => {
      const tagsA = {
        'platform': {
          'linux': true,
          'windows': true
        },
        'subject': {
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': true
        }
      };
      const tagsB = {};

      deepFreeze(tagsA);
      deepFreeze(tagsB);
      expect(mergeTags(tagsA, tagsB)).to.eql(tagsA);
    });
  });

  describe('tagsMatchFilter', () => {
    it('returns true if all tags match entire filter', () => {
      const tags = {
        'platform': ['linux'],
        'subject': ['math', 'physics'],
        'category': ['create app']
      };
      const filter = {
        'platform': {
          'android': false,
          'linux': true,
          'mac': false,
          'windows': false
        },
        'subject': {
          'math': true,
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': false,
        }
      };

      deepFreeze(tags);
      deepFreeze(filter);
      expect(tagsMatchFilter(tags, filter)).to.equal(true);
    });

    it('returns false if tags does not match entire filter', () => {
      const tags = {
        'platform': ['linux'],
        'subject': ['math', 'programming'],
        'category': ['create app', 'arduino']
      };
      const filter = {
        'platform': {
          'android': false,
          'linux': true,
          'mac': false,
          'windows': true
        },
        'subject': {
          'math': true,
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': false,
        }
      };

      deepFreeze(tags);
      deepFreeze(filter);
      expect(tagsMatchFilter(tags, filter)).to.equal(false);
    });

    it('returns false if tags does not match filter', () => {
      const tags = {
        'platform': ['linux'],
        'subject': ['math', 'programming'],
        'category': ['create app', 'arduino']
      };
      const filter = {
        'platform': {
          'android': false,
          'linux': false,
          'mac': false,
          'windows': true
        },
        'subject': {
          'math': false,
          'physics': true
        },
        'category': {
          'create app': true,
          'create game': false,
          'robots': true
        }
      };

      deepFreeze(tags);
      deepFreeze(filter);
      expect(tagsMatchFilter(tags, filter)).to.equal(false);
    });
  });

});
