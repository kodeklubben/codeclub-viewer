import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  capitalize,
  basename,
  dirname,
  cleanseTags,
  fixNonArrayTagList,
  mergeTags,
  tagsMatchFilter,
  removeHtmlFileEnding,
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

  describe('removeHtmlFileEnding', () => {
    it('simple test to see that .html is removed correctly', () => {
      const testString = '<a href="../stuff.html">“html HTML> .html .html>"</a>';
      const correctString = '<a href="../stuff">“html HTML> .html .html>"</a>';
      expect(removeHtmlFileEnding(testString)).to.equal(correctString);
    });

    it('Returns true if string is unchanged', () => {
      const testString = '../html"> .html"> ../.html> ../.html"';
      expect(removeHtmlFileEnding(testString)).to.equal(testString);
    });

    it('Checks that multiple links are correctly edited', () => {
      const testString = '<a href="../del_inn_nettsiden/del_inn_nettsiden.html">“Del inn nettsiden"</a>\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend sit amet nulla nec consectetur.\
<a href="../forsvunnet_katt/forsvunnet_katt.html">Forvunnet katt</a>';
      const correctString = '<a href="../del_inn_nettsiden/del_inn_nettsiden">“Del inn nettsiden"</a>\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend sit amet nulla nec consectetur.\
<a href="../forsvunnet_katt/forsvunnet_katt">Forvunnet katt</a>';
      expect(removeHtmlFileEnding(testString)).to.equal(correctString);
    });

    it('Returns true if ".html" ending is removed from string of gibberish', () => {
      const testString = '<a href="../we/write&some-.,Bull*#¤here+-*and)(-"seIF<>the++?/regEx_will?=)\
(/&%¤#"!remove"The.,Ending^~correctly,We__æøå_alsoPut&%In__Somehtml_words,likeHtml.or.HTML.html_htmlstuff\
The_Only.thing.that.should.be&removed*is,the".html".ending.html">“html HTML> .html .html>"</a>';

      const correctString = '<a href="../we/write&some-.,Bull*#¤here+-*and)(-"seIF<>the++?/regEx_will?=)\
(/&%¤#"!remove"The.,Ending^~correctly,We__æøå_alsoPut&%In__Somehtml_words,likeHtml.or.HTML.html_htmlstuff\
The_Only.thing.that.should.be&removed*is,the".html".ending">“html HTML> .html .html>"</a>';
      expect(removeHtmlFileEnding(testString)).to.equal(correctString);
    });
  });

});
