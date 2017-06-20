import {localstorageStoreCheckboxes} from '../localStorage';

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_CHECKBOXES':
      return localstorageStoreCheckboxes(action.payload);
  }
  return state;
}
