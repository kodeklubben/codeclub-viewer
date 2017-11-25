import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  capitalize,
  cleanseTags,
  fixNonArrayTagList,
  tagsMatchFilter,
  removeHtmlFileEnding,
  arrayToObject,
} from '../src/util';




describe('util', () => {

  describe('capitalize', () => {

    it('makes first letter in a string capital', () => {
      const text = 'a random string';

      expect(capitalize(text)).to.equal('A random string');
    });
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
