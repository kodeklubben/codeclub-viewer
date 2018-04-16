import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {setFilter, resetAllFilters, resetOneFilter, filterChecked} from '../../src/reducers/filter';

describe('filter reducer', () => {
  describe('SET_FILTER', () => {

    it('sets filter in empty initialState', () => {
      const initialState = {};
      const filter = {
        platform: {
          'windows': false,
          'mac': false,
        },
        category: {'create game': false},
        subject: {'reading': false},
      };
      const action = setFilter(filter);
      
      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(filter);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(filter);
    });

    it('sets filter in non-empty initialState', () => {
      const initialState = {
        platform: {
          'windows': true,
          'browser': false,
        },
        category: {'create app': false},
        subject: {'math': true},
      };
      const filter = {
        platform: {
          'windows': false,
          'mac': false,
        },
        category: {'create game': false},
        subject: {'reading': false},
      };
      const action = setFilter(filter);
      
      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(filter);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(filter);
    });
  });

  describe('RESET_ALL_FILTERS', () => {
    it('should set all tags in filter to false', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false,
        },
        category: {'create game': true},
        subject: {'reading': true},
      };
      const action = resetAllFilters();

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        platform: {
          'windows': false,
          'mac': false,
        },
        category: {'create game': false},
        subject: {'reading': false},
      });
    });

    it('should set all tags in filter except platform/mac to false', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false,
        },
        category: {'create game': true},
        subject: {'reading': true},
      };
      const action = resetAllFilters('platform', 'mac');

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        platform: {
          'windows': false,
          'mac': true,
        },
        category: {'create game': false},
        subject: {'reading': false},
      });
    });

    it('should return empty object if filter has no tags', () => {
      const initialState = {};
      const action = resetAllFilters();

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({});
    });
  });

  describe('RESET_ONE_FILTER', () => {
    it('should not change anything if no groupKey or tagKey is specified', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': true}
      };
      const action = resetOneFilter();

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(initialState);
    });

    it('should set all tags in specified filter to false if tagKey is not specified', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': true}
      };
      const action = resetOneFilter('platform');

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': true}
      });
    });

    it('should set all tags in platform except mac to false, leave other filtergroups alone', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false,
        },
        category: {'create game': true},
        subject: {'reading': true},
      };
      const action = resetOneFilter('platform', 'mac');

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        platform: {
          'windows': false,
          'mac': true,
        },
        category: {'create game': true},
        subject: {'reading': true},
      });
    });

    it('should return empty object if filter has no tags', () => {
      const initialState = {};
      const action = resetOneFilter();

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({});
    });
  });

  describe('FILTER_CHECKED', () => {

    it('changes state (checked/unchecked) of tagItem in filter', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': true}
      };
      const action = filterChecked('platform', 'mac');
      
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        platform: {
          'windows': true,
          'mac': true
        },
        category: {'create game': false},
        subject: {'reading': true}
      });
    });

    it('does nothing if groupKey does not already exist in filter', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': true}
      };
      const action = filterChecked('something', 'mac');
      
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(initialState);
    });

    it('does nothing if tagKey does not already exist in filter', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': true}
      };
      const action = filterChecked('platform', 'browser');
      
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(initialState);
    });

    it('does nothing if payload is empty', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': true}
      };
      const action = filterChecked();
      
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(initialState);
    });
  });

});
