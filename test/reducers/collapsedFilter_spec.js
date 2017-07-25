import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/collapsedFilter';

describe('collapsedFilter reducer', () => {
  describe('SET_COLLAPSEDFILTER', () => {
    it('Should set collapsed filter in state true', () => {
      const initialState = false;
      const action = {
        type: 'SET_COLLAPSEDFILTER'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(true);
    });
  });
});
