import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/language';

describe('language reducer', () => {
  describe('SET_LANGUAGE', () => {
    it('sets current language to argument', () => {
      const initialState = 'sweden';
      const action = {
        type: 'SET_LANGUAGE',
        payload: 'norway'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('norway');
    });

    it('sets current language to null if argument is not specified or not valid', () => {
      const initialState = {};
      const action = {
        type: 'SET_LANGUAGE',
        payload: ''
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(null);
    });
  });
});
