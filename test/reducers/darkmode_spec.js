import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {setShowDarkMode} from '../../src/reducers/showDarkMode';

describe('darkmode reducer', () => {
  describe('SET_SHOW_DARK_MODE', () => {
    it('Change showDarkMode from true to false.', () => {
      const initialState = true;
      const action = setShowDarkMode(false);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal(false);
    });

    it('Change showDarkMode from false to true.', () => {
      const initialState = false;
      const action = setShowDarkMode(true);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal(true);
    });
  });
});
