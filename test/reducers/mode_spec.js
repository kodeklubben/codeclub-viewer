import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/mode';

describe('mode reducer', () => {
  describe('SET_MODE_STUDENT', () => {
    it('sets current mode to true if previous mode was false', () => {
      const initialState = false;
      const action = {
        type: 'SET_MODE_STUDENT'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(true);
    });

    it('sets current mode to true if previous mode was true', () => {
      const initialState = true;
      const action = {
        type: 'SET_MODE_STUDENT'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(true);
    });

    it('sets current mode to true if state is empty', () => {
      const initialState = {};
      const action = {
        type: 'SET_MODE_STUDENT'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(true);
    });
  });

  describe('SET_MODE_TEACHER', () => {
    it('sets current mode to false if previous mode was true', () => {
      const initialState = true;
      const action = {
        type: 'SET_MODE_TEACHER'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(false);
    });

    it('sets current mode to false if previous mode was false', () => {
      const initialState = false;
      const action = {
        type: 'SET_MODE_TEACHER'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(false);
    });

    it('sets current mode to false if state is empty', () => {
      const initialState = {};
      const action = {
        type: 'SET_MODE_TEACHER'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(false);
    });
  });
});
