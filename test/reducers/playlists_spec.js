import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {setShowPlaylists} from '../../src/reducers/playlists';

describe('playlists reducer', () => {
  describe('SET_SHOW_PLAYLISTS', () => {
    it('Change showPlaylists from true to false.', () => {
      const initialState = true;
      const action = setShowPlaylists(false);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal(false);
    });

    it('Change showPlaylists from false to true.', () => {
      const initialState = false;
      const action = setShowPlaylists(true);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal(true);
    });
  });
});
