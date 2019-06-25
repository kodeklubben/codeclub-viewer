import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {setCheckbox, removeCheckbox, setCheckboxes} from '../../src/reducers/checkboxes';

describe('checkboxes reducer', () => {
  describe('SET_CHECKBOX', () => {
    it('when no checkboxes exist in state', () => {
      const initialState = {};
      const action = setCheckbox('path/to/lesson', '1234', true);
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {
          '1234': true,
        }
      };
      expect(nextState).to.deep.equal(expectedState);
    });

    it('when checkbox was previously set to false', () => {
      const initialState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': true,
        }
      };
      const action = setCheckbox('path/to/lesson', '1234', true);
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {
          '1234': true,
          '5678': true,
        }
      };
      expect(nextState).to.deep.equal(expectedState);
    });

    it('when checkbox was previously set to true', () => {
      const initialState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': true,
        }
      };
      const action = setCheckbox('path/to/lesson', '5678', false);
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': false,
        }
      };
      expect(nextState).to.deep.equal(expectedState);
    });
  });

  describe('REMOVE_CHECKBOX', () => {
    it('when path does not exist in state', () => {
      const initialState = {};
      const action = removeCheckbox('path/to/lesson', '1234');
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {}
      };
      expect(nextState).to.deep.equal(expectedState);
    });

    it('when path exists but checkbox does not exist in state', () => {
      const initialState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': false,
        }
      };
      const action = removeCheckbox('path/to/lesson', '9999');
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = initialState;
      expect(nextState).to.deep.equal(expectedState);
    });

    it('when checkbox was previously set to false', () => {
      const initialState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': true,
        }
      };
      const action = removeCheckbox('path/to/lesson', '1234');
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {
          '5678': true,
        }
      };
      expect(nextState).to.deep.equal(expectedState);
    });
    
    it('when checkbox was previously set to true', () => {
      const initialState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': true,
        }
      };
      const action = removeCheckbox('path/to/lesson', '5678');
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
        }
      };
      expect(nextState).to.deep.equal(expectedState);
    });
  });

  describe('SET_CHECKBOXES', () => {
    it('when no checkboxes exist in state', () => {
      const initialState = {};
      const checkboxes = {
        '1234': false,
        '5678': true,
      };
      const action = setCheckboxes('path/to/lesson', checkboxes);
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': true,
        }
      };
      expect(nextState).to.deep.equal(expectedState);
    });

    it('when checkboxes exist for given path', () => {
      const initialState = {
        'checkboxes_path/to/lesson': {
          '1234': false,
          '5678': true,
        },
        'checkboxes_path/to/lesson2': {
          '2222': true,
          '3333': false,
        },
      };
      const checkboxes = {
        '7777': true,
        '8888': false,
      };
      const action = setCheckboxes('path/to/lesson', checkboxes);
      deepFreeze(initialState);
      deepFreeze(action);
      const nextState = reducer(initialState, action);
      const expectedState = {
        'checkboxes_path/to/lesson': {
          '7777': true,
          '8888': false,
        },
        'checkboxes_path/to/lesson2': {
          '2222': true,
          '3333': false,
        },
      };
      expect(nextState).to.deep.equal(expectedState);
    });
  });
});
