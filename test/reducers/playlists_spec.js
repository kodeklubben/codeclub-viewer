import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {setShowPlaylists} from '../../src/reducers/playlists';

describe('playlists reducer', () => {
  describe('SET_SHOW_PLAYLISTS', () => {
    it('adds state if it does not exist', () => {
      const initialState = true;
      const action = setShowPlaylists(false);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal(false);
    });
  });
});
