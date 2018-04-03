import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {collapseFilterGroup, collapseAllFilterGroups} from '../../src/reducers/filterGroupsCollapsed';

describe('filterGroupsCollapse reducer', () => {
  describe('COLLAPSE_FILTERGROUP', () => {
    it('adds state if it does not exist', () => {
      const initialState = {};
      const action = collapseFilterGroup('language', false);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal({...initialState, language: false});
    });
    it('changes state if it does exist', () => {
      const initialState = {language: true, somethingelse: false};
      const action = collapseFilterGroup('language', false);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal({...initialState, language: false});
    });
  });

  describe('COLLAPSE_ALL_FILTERGROUPS', () => {
    it('collapses all if some are open', () => {
      const initialState = {firstGroup: true, secondGroup: false};
      const action = collapseAllFilterGroups(true);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal({firstGroup: true, secondGroup: true});
    });
    it('opens all if some are closed', () => {
      const initialState = {firstGroup: true, secondGroup: false};
      const action = collapseAllFilterGroups(false);

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.deep.equal({firstGroup: false, secondGroup: false});
    });
  });
});
