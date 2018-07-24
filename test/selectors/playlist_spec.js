import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import {
  getShowRadiobuttons,
  getShowFiltergroups,
} from '../../src/selectors/playlist';

describe('[selectors/playlist.js] Selector', () => {
  describe('getShowRadiobuttons', () => {
    it('should return true given no course, since there exists playlists', () => {
      expect(getShowRadiobuttons()).to.equal(true);
    });

    it('should return true given course scratch, since it has playlists', () => {
      expect(getShowRadiobuttons('scratch')).to.equal(true);
    });

    it('should return false given course python, since it has no playlists', () => {
      expect(getShowRadiobuttons('python')).to.equal(false);
    });
  });

  describe('getShowFiltergroups', () => {
    it('should return true given no course, if showPlaylists is false', () => {
      const state = {
        showPlaylists: false,
      };
      deepFreeze(state);
      expect(getShowFiltergroups(state)).to.equal(true);
    });

    it('should return false given no course, if showPlaylists is true, since there exists playlists', () => {
      const state = {
        showPlaylists: true,
      };
      deepFreeze(state);
      expect(getShowFiltergroups(state)).to.equal(false);
    });

    it('should return false given course scratch, if showPlaylists is true, since scratch has playlists', () => {
      const state = {
        showPlaylists: true,
      };
      deepFreeze(state);
      expect(getShowFiltergroups(state, 'scratch')).to.equal(false);
    });

    it('should return true given course scratch, if showPlaylists is false', () => {
      const state = {
        showPlaylists: false,
      };
      deepFreeze(state);
      expect(getShowFiltergroups(state, 'scratch')).to.equal(true);
    });

    it('should return true given course python, if showPlaylists is true, since python does not have playlists', () => {
      const state = {
        showPlaylists: true,
      };
      deepFreeze(state);
      expect(getShowFiltergroups(state, 'python')).to.equal(true);
    });

    it('should return true given course python, if showPlaylists is false', () => {
      const state = {
        showPlaylists: true,
      };
      deepFreeze(state);
      expect(getShowFiltergroups(state, 'python')).to.equal(true);
    });
  });
});
