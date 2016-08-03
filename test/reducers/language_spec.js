import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/language';

describe('language reducer', () => {
  describe('SET_LANGUAGE', () => {
    it('sets current language to argument', () => {
      const initialState = 'sv';
      const action = {
        type: 'SET_LANGUAGE',
        payload: 'nn'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('nn');
    });

    it('sets current language to previous state if argument is not specified or not valid', () => {
      const initialState = {};
      const action = {
        type: 'SET_LANGUAGE',
        payload: ''
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(initialState);
    });
  });
});
