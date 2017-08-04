import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {somethingCheckedInFilter, somethingCheckedInGroup} from '../../src/selectors/filter';

const FILTER_SOMETHINGCHECKED_NN = deepFreeze({
  language: {
    nb: false,
    nn: true,
    en: false
  },
  tema: {
    app: true,
    electronics: false,
    block_based: false,
    minecraft: false,
    web: false,
    game: true,
    robot: false,
    animation: false
  }
});

const FILTER_EVERYTHING_UNCHECKED = deepFreeze({
  language: {
    nb: false,
    nn: false,
    en: false
  },
  tema: {
    app: false,
    electronics: false,
    block_based: false,
    minecraft: false,
    web: false,
    game: false,
    robot: false,
    animation: false
  }
});

const FILTER_NOTHINGCHECKED_NB = deepFreeze({
  language: {
    nb: true,
    nn: false,
    en: false
  },
  tema: {
    app: false,
    electronics: false,
    block_based: false,
    minecraft: false,
    web: false,
    game: false,
    robot: false,
    animation: false
  }
});

const FILTER_NOTHINGCHECKED_EN = deepFreeze({
  language: {
    nb: false,
    nn: false,
    en: true
  },
  tema: {
    app: false,
    electronics: false,
    block_based: false,
    minecraft: false,
    web: false,
    game: false,
    robot: false,
    animation: false
  }
});

describe('filter selector', () => {
  describe('somethingCheckedInFilter', () => {

    it('returns true if main language checked and also tags in other groups', () => {
      expect(somethingCheckedInFilter.resultFunc(FILTER_SOMETHINGCHECKED_NN, 'nn')).to.eql(true);
    });

    it('returns true if non-main language checked and also tags in other groups', () => {
      expect(somethingCheckedInFilter.resultFunc(FILTER_SOMETHINGCHECKED_NN, 'nb')).to.eql(true);
    });

    it('returns true if nothing is checked', () => {
      expect(somethingCheckedInFilter.resultFunc(FILTER_EVERYTHING_UNCHECKED, 'nb')).to.eql(true);
    });

    it('returns false if nothing is checked for english', () => {
      expect(somethingCheckedInFilter.resultFunc(FILTER_NOTHINGCHECKED_EN, 'en')).to.eql(false);
    });

    it('returns false if nothing is checked for norwegian bokmål', () => {
      expect(somethingCheckedInFilter.resultFunc(FILTER_NOTHINGCHECKED_NB, 'nb')).to.eql(false);
    });

    it('returns true if nothing is checked for norwegian bokmål, but main language is english', () => {
      expect(somethingCheckedInFilter.resultFunc(FILTER_NOTHINGCHECKED_NB, 'en')).to.eql(true);
    });

  });

  describe('somethingCheckedInGroup', () => {
    it('is language group and only main language is checked, but tags are checked in other groups', () => {
      expect(somethingCheckedInGroup.resultFunc(FILTER_SOMETHINGCHECKED_NN, 'nn', 'language')).to.eql(false);
    });

    it('is language group and only non-main language is checked, but tags are checked in other groups', () => {
      expect(somethingCheckedInGroup.resultFunc(FILTER_SOMETHINGCHECKED_NN, 'nb', 'language')).to.eql(true);
    });

    it('is non-language group and only main language is checked, but tags are checked in other groups', () => {
      expect(somethingCheckedInGroup.resultFunc(FILTER_SOMETHINGCHECKED_NN, 'nn', 'tema')).to.eql(true);
    });

    it('is language group and only non-main language is checked, but tags are checked in other groups', () => {
      expect(somethingCheckedInGroup.resultFunc(FILTER_SOMETHINGCHECKED_NN, 'nb', 'tema')).to.eql(true);
    });

    it('is non-language group and no language is checked, and no tags in other groups are checked', () => {
      expect(somethingCheckedInGroup.resultFunc(FILTER_EVERYTHING_UNCHECKED, 'nb', 'tema')).to.eql(false);
    });

  });
});

