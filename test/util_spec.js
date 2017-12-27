import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  capitalize,
  basename,
  dirname,
  cleanseTags,
  fixNonArrayTagList,
  tagsMatchFilter,
  arrayToObject,
} from '../src/util';

describe('util', () => {

  describe('capitalize', () => {

    it('makes first letter in a string capital', () => {
      const text = 'a random string';

      expect(capitalize(text)).to.equal('A random string');
    });
  });

  describe('basename', () => {
    it('gets file.ext from /folder/subfolder/file.ext', () => {
      expect(basename('/folder/subfolder/file.ext')).to.equal('file.ext');
    });
    it('gets file.ext from folder/subfolder/file.ext', () => {
      expect(basename('folder/subfolder/file.ext')).to.equal('file.ext');
    });
    it('gets subfolder from /folder/subfolder/', () => {
      expect(basename('/folder/subfolder/')).to.equal('subfolder');
    });
    it('gets subfolder from /folder/subfolder', () => {
      expect(basename('/folder/subfolder')).to.equal('subfolder');
    });
    it('gets file.ext from /file.ext', () => {
      expect(basename('/file.ext')).to.equal('file.ext');
    });
    it('gets file.ext from file.ext', () => {
      expect(basename('file.ext')).to.equal('file.ext');
    });
    it('gets / from /', () => {
      expect(basename('/')).to.equal('/');
    });
    it('gets empty string from empty string', () => {
      expect(basename('')).to.equal('');
    });
  });

  describe('dirname', () => {
    it('gets /folder/subfolder from /folder/subfolder/file.ext', () => {
      expect(dirname('/folder/subfolder/file.ext')).to.equal('/folder/subfolder');
    });
    it('gets folder/subfolder/ from folder/subfolder/file.ext', () => {
      expect(dirname('folder/subfolder/file.ext')).to.equal('folder/subfolder');
    });
    it('gets /folder from /folder/subfolder/', () => {
      expect(dirname('/folder/subfolder/')).to.equal('/folder');
    });
    it('gets /folder from /folder/subfolder', () => {
      expect(dirname('/folder/subfolder')).to.equal('/folder');
    });
    it('gets / from /file.ext', () => {
      expect(dirname('/file.ext')).to.equal('/');
    });
    it('gets . from file.ext', () => {
      expect(dirname('file.ext')).to.equal('.');
    });
    it('gets / from /', () => {
      expect(dirname('/')).to.equal('/');
    });
    it('gets . from empty string', () => {
      expect(dirname('')).to.equal('.');
    });
  });


  ///////////////////////////////////
  //////// HELPER FUNCTIONS /////////
  ///////////////////////////////////

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
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'mathematics'],
        category: ['create game', 'create app'],
        created: ['2016'],
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
        platform: ['windows', 'mac', 'browser'],
        subject: ['physics', 'mathematics'],
        category: ['create game', 'create app'],
        created: ['2016']
      });
    });
  });

  describe('arrayToObject', () => {
    it('converts array to object where lowercased array items are used as keys and values are "false"', () => {
      const array = ['one', 'Two', 'THREE'];
      deepFreeze(array);
      expect(arrayToObject(array)).to.eql({
        'one': false,
        'Two': false,
        'THREE': false,
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
