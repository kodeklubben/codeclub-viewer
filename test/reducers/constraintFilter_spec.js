import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/constraintFilter';

describe('constraint filter reducer', () => {
  describe('SET_CONSTRAINT_FILTER', () => {

    it('sets filter in empty initialState', () => {
      const initialState = {};
      const constraintFilter = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const action = {
        type: 'SET_CONSTRAINT_FILTER',
        payload: {
          constraints: constraintFilter
        }
      };

      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(constraintFilter);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(constraintFilter);
    });

    it('sets filter in non-empty initialState', () => {
      const initialState = {
        'constraint 1': false,
        'constraint 2': false,
        'constraint 3': true,
        'constraint 4': true
      };
      const constraintFilter = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const action = {
        type: 'SET_CONSTRAINT_FILTER',
        payload: {
          constraints: constraintFilter
        }
      };

      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(constraintFilter);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(constraintFilter);
    });
  });

  describe('RESET_FILTER', () => {
    it('should set all tags in filter to false', () => {
      const initialState = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const action = {
        type: 'RESET_FILTER'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        'only windows': false,
        'not ipad': false,
        'costs money': false,
        'only browser': false
      });
    });

    it('should return empty object if filter has no tags', () => {
      const initialState = {};
      const action = {
        type: 'RESET_FILTER'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({});
    });
  });

  describe('CONSTRAINT_CHECKED', () => {

    it('changes state of constraint to true if it was false', () => {
      const initialState = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const action = {
        type: 'CONSTRAINT_CHECKED',
        payload: {
          constraint: 'not ipad'
        }
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        'only windows': true,
        'not ipad': true,
        'costs money': false,
        'only browser': true
      });
    });

    it('changes state of constraint to false if it was true', () => {
      const initialState = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const action = {
        type: 'CONSTRAINT_CHECKED',
        payload: {
          constraint: 'only windows'
        }
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        'only windows': false,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      });
    });

    it('does nothing if constraint does not already exist in filter', () => {
      const initialState = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const action = {
        type: 'CONSTRAINT_CHECKED',
        payload: {
          constraint: 'some constraint not in filter'
        }
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(initialState);
    });

    it('does nothing if payload is empty', () => {
      const initialState = {
        'only windows': true,
        'not ipad': false,
        'costs money': false,
        'only browser': true
      };
      const action = {
        type: 'FILTER_CHECKED',
        payload: {}
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(initialState);
    });
  });

});
