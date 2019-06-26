import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../src/selectors/checkboxes';

const checkboxesForLesson_empty = deepFreeze({});

const checkboxesForLesson_zeroChecked = deepFreeze({
  104227806: false,
  858451434: false,
  1317817857: false,
});

const checkboxesForLesson_twoChecked = deepFreeze({
  104227806: true,
  858451434: false,
  1317817857: true,
});

const checkboxesForLesson_threeChecked = deepFreeze({
  104227806: true,
  858451434: true,
  1317817857: true,
});

describe('selectors for checkboxes', () => {

  describe('getNumberOfCheckedCheckboxes', () => {

    it('should return zero when there are no checkboxes', () => {
      expect(getNumberOfCheckedCheckboxes.resultFunc(checkboxesForLesson_empty)).to.equal(0);
    });

    it('should return zero when 0 of 3 checkboxes are checked', () => {
      expect(getNumberOfCheckedCheckboxes.resultFunc(checkboxesForLesson_zeroChecked)).to.equal(0);
    });

    it('should return two when 2 of 3 checkboxes are checked', () => {
      expect(getNumberOfCheckedCheckboxes.resultFunc(checkboxesForLesson_twoChecked)).to.equal(2);
    });

    it('should return three when 3 of 3 checkboxes are checked', () => {
      expect(getNumberOfCheckedCheckboxes.resultFunc(checkboxesForLesson_threeChecked)).to.equal(3);
    });

  });

  describe('getTotalNumberOfCheckboxes', () => {

    it('Should return zero when there are no checkboxes', () => {
      expect(getTotalNumberOfCheckboxes.resultFunc(checkboxesForLesson_empty)).to.equal(0);
    });

    it('should return three when 0 of 3 checkboxes are checked', () => {
      expect(getTotalNumberOfCheckboxes.resultFunc(checkboxesForLesson_zeroChecked)).to.equal(3);
    });

    it('should return three when 2 of 3 checkboxes are checked', () => {
      expect(getTotalNumberOfCheckboxes.resultFunc(checkboxesForLesson_twoChecked)).to.equal(3);
    });

    it('should return three when 3 of 3 checkboxes are checked', () => {
      expect(getTotalNumberOfCheckboxes.resultFunc(checkboxesForLesson_threeChecked)).to.equal(3);
    });

  });

});
