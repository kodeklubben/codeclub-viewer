import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/lastLesson';

describe('lastLesson reducer', () => {
  describe('SET_LASTLESSON', () => {
    it('Should set last lesson in state to empty string', () => {
      const initialState = '/scratch/astrokatt/astrokatt';
      const action = {
        type: 'SET_LASTLESSON',
        path: ''
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });

    it('Should set last lesson in state to /scratch/astrokatt/astrokatt', () => {
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

    it('Should return initial state, if type is missing', () => {
      const initialState = '';
      const action = {
        path: '/scratch/astrokatt/astrokatt'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(initialState);
    });

    it('Should return initial state, if type is unknown', () => {
      const initialState = '';
      const action = {
        type: 'unknown',
        path: '/scratch/astrokatt/astrokatt'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(initialState);
    });

    it('Should throw error if path is missing', () => {
      const initialState = '';
      const action = {
        type: 'SET_LASTLESSON'
      };

      deepFreeze(initialState);
      deepFreeze(action);

      expect((initialState, action) => reducer(initialState, action)).to.throw(TypeError);
    });

    it('Should set last lesson in state to path regardless of initialState', () => {
      const initialState = '';
      const action = {
        type: 'SET_LASTLESSON',
        path: null
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(action.path);
    });
  });
});
