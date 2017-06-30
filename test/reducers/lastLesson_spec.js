import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/lastLesson';

describe('lastLesson reducer', () => {
  describe('SET_LASTLESSON', () => {
    it('Sets last lesson in state to empty string', () => {
      const initialState = '';
      const action = {
        type: 'SET_LASTLESSON',
        path: ''
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });

    it('Sets last lesson in state to /scratch/astrokatt/astrokatt', () => {
      const initialState = '';
      const action = {
        type: 'SET_LASTLESSON',
        path: '/scratch/astrokatt/astrokatt'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });

    it('Missing type', () => {
      const initialState = '';
      const action = {
        path: '/scratch/astrokatt/astrokatt'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });

    it('Type unknown', () => {
      const initialState = '';
      const action = {
        type: 'unknown',
        path: '/scratch/astrokatt/astrokatt'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });

    it('Missing path', () => {
      const initialState = '';
      const action = {
        type: 'SET_LASTLESSON'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });

    it('Path unknown', () => {
      const initialState = '';
      const action = {
        type: 'SET_LASTLESSON',
        path: 'unknown'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });
  });
});
