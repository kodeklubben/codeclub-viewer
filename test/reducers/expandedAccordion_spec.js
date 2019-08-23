import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {setExpandedAccordion} from '../../src/reducers/expandedAccordion';

describe('expandedAccordion reducer', () => {
  describe('SET_EXPANDED_ACCORDION', () => {
    it('add scratch if it does not exists', () => {
      const initialState = {};
      const action = setExpandedAccordion('scratch', null);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal({...initialState, scratch: null});
    });
    it('change scratch if it does exists', () => {
      const initialState = {scratch: 1};
      const action = setExpandedAccordion('scratch', 0);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal({...initialState, scratch: 0});
    });
  });
});
