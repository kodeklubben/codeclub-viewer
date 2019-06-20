import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/expandedAccordion';

describe('expandedAccordion reducer', () => {
  describe('SET_EXPANDED_ACCORDION', () => {
    it('Should set accordion value for course to null', () => {
      const initialState = {};
      const action = {
        type: 'SET_EXPANDED_ACCORDION',
        course: 'scratch',
        activeKey: null
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });
  });
});
