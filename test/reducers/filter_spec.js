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
        payload: {
          filter
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': false}
      });
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
        payload: {
          filter
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': false}
      });
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
        payload: {
          groupName: 'platform',
          tagName: 'mac'
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        platform: {
          'windows': true,
          'mac': true
        },
        category: {'create game': false},
        subject: {'reading': true}
      });
    });

    it('does nothing if groupName does not already exist in filter', () => {
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
        payload: {
          groupName: 'something',
          tagName: 'mac'
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': true}
      });
    });

    it('does nothing if tagName does not already exist in filter', () => {
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
        payload: {
          groupName: 'platform',
          tagName: 'browser'
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': true}
      });
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
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        platform: {
          'windows': true,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': true}
      });
    });
  });

});
