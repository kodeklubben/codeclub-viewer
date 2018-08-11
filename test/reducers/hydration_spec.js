import {expect} from 'chai';
import reducer, {setHydrationComplete} from '../../src/reducers/hydration';

describe('hydration reducer', () => {
  describe('SET_HYDRATION_COMPLETE', () => {
    it('Set hydration complete.', () => {
      const initialState = false;
      const action = setHydrationComplete();
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(true);
    });
  });
});
