import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  capitalize,
  cleanseTags,
  fixNonArrayTagList,
  tagsContainAllTagsInFilter
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

  describe('tagsContainAllTagsInFilter', () => {
    it('return true if all tags contain all tags in filter', () => {
      const filter = {
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

      deepFreeze(filter);
      deepFreeze(lesson);
      expect(tagsContainAllTagsInFilter(lesson.tags, filter)).to.equal(true);
    });

    it('return false if all tags do not contain all tags in filter', () => {
      const filter = {
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

      deepFreeze(filter);
      deepFreeze(lesson);
      expect(tagsContainAllTagsInFilter(lesson.tags, filter)).to.equal(false);
    });

    it('is not affected by object extension', () => {
      Object.prototype.hi = function(){console.log('muhahaha');};
      const filter = {
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

      deepFreeze(filter);
      deepFreeze(lesson);
      expect(tagsContainAllTagsInFilter(lesson.tags, filter)).to.equal(true);
    });

    it('return true filter is empty', () => {
      const filter = {};
      const lesson = {
        name: 'task1',
        tags: {
          platform: ['no-iPad', 'windows'],
          category: ['create game']
        }
      };
  
      deepFreeze(filter);
      deepFreeze(lesson);
      expect(tagsContainAllTagsInFilter(lesson.tags, filter)).to.equal(true);
    });

  });
});

