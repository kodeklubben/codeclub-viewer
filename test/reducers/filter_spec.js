import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/filter';

describe('filter reducer', () => {
  describe('SET_FILTER', () => {

    it('sets filter in empty initialState', () => {
      const initialState = {};
      const filter = {
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': false}
      };
      const action = {
        type: 'SET_FILTER',
        filter
      };
      
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
          'browser': false
        },
        category: {'create app': false},
        subject: {'math': true}
      };
      const filter = {
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': false}
      };
      const action = {
        type: 'SET_FILTER',
        filter
      };
      
      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(filter);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(filter);
    });
  });

  describe('RESET_FILTER', () => {
    it('should set all tags in filter to false', () => {
      const initialState = {
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': true},
        subject: {'reading': true}
      };
      const action = {
        type: 'RESET_FILTER'
      };

      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql({
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': false}
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
      const action = {
        type: 'FILTER_CHECKED',
        groupKey: 'platform',
        tagKey: 'mac'
      };
      
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
      const action = {
        type: 'FILTER_CHECKED',
        groupKey: 'something',
        tagKey: 'mac'
      };
      
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
      const action = {
        type: 'FILTER_CHECKED',
        groupKey: 'platform',
        tagKey: 'browser'
      };
      
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
