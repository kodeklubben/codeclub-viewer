import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/language';

describe('language reducer', () => {
  describe('SET_LANGUAGE_NORWAY', () => {
    it('sets current language to norwegian', () => {
      const initialState = 'other';
      const action = {
        type: 'SET_LANGUAGE_NORWAY'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('norway');
    });

    it('sets current language to norwegian if state is empty', () => {
      const initialState = {};
      const action = {
        type: 'SET_LANGUAGE_NORWAY'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('norway');
    });
  });

  describe('SET_LANGUAGE_SWEDEN', () => {
    it('sets current language to swedish', () => {
      const initialState = 'other';
      const action = {
        type: 'SET_LANGUAGE_SWEDEN'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('sweden');
    });

    it('sets current language to swedish if state is empty', () => {
      const initialState = {};
      const action = {
        type: 'SET_LANGUAGE_SWEDEN'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('sweden');
    });
  });

  describe('SET_LANGUAGE_DENMARK', () => {
    it('sets current language to danish', () => {
      const initialState = 'other';
      const action = {
        type: 'SET_LANGUAGE_DENMARK'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('denmark');
    });

    it('sets current language to danish if state is empty', () => {
      const initialState = {};
      const action = {
        type: 'SET_LANGUAGE_DENMARK'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('denmark');
    });
  });
});
