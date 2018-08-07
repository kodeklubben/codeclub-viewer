import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {setShowDyslexicFont} from '../../src/reducers/showDyslexicFont';

describe('dyslexia reducer', () => {
  describe('SET_SHOW_DYSLEXICFONT', () => {
    it('Change showDyslexicFont from true to false.', () => {
      const initialState = true;
      const action = setShowDyslexicFont(false);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal(false);
    });

    it('Change showDyslexicFont from false to true.', () => {
      const initialState = false;
      const action = setShowDyslexicFont(true);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal(true);
    });
  });
});
