import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import {arrayToObject} from '../../src/utils/util';

describe('util', () => {

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

});
