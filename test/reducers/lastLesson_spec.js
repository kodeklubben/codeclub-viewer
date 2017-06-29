import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/lastLesson';

describe('lastLesson reducer', () => {
  describe('SET_LASTLESSON', () => {
    it('Sets state to empty string', () => {
      const initialState = '';
      const action = {
        type: 'SET_LASTLESSON',
        path: initialState
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('');
    });

    it('Sets last lesson in state to /scratch/astrokatt/astrokatt', () => {
      const initialState = '/scratch/astrokatt/astrokatt';
      const action = {
        type: 'SET_LASTLESSON',
        path: initialState
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal('/scratch/astrokatt/astrokatt');
    });
  });
});
