import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import {tagsMatchFilter, fixNonArrayTagList, cleanseTags} from '../../src/utils/filterUtils';

describe('filterUtils', () => {

  describe('cleanseTags', () => {
    it('fixes invalid tag lists and return array', () => {
      const dirtyTags = {
        platform: 'windows, mac,     browser',
        subject: 'physics, mathematics',
        CAtegOry: ['create game', 'create app'],
        created: 2016,
        nothing: [],
        someTag: ['Tag1', 'tag2'],
        invalidGroupKey: ['tag1', 'tag2'],
        grade: ['junior', 'invalidtag']
      };
      deepFreeze(dirtyTags);
      expect(cleanseTags(dirtyTags, 'test')).to.eql({
        subject: ['mathematics'],
        sometag: ['tag1', 'tag2'],
        grade: ['junior'],
      });
    });

    it('does not change already valid tag lists', () => {
      const validTags = {
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'mathematics'],
        category: ['create game', 'create app'],
        created: ['2016']
      };
      deepFreeze(validTags);
      expect(cleanseTags(validTags, 'test')).to.eql({
        subject: ['mathematics'],
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
