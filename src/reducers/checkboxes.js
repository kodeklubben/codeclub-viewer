import {localstorageStoreCheckboxes} from '../localStorage';

export default function(state={}, action) {
  let checkboxObject;
  switch(action.type) {
    case 'SET_CHECKBOXES':
      checkboxObject = localstorageStoreCheckboxes(action.payload.path, action.payload.checkboxes);
      return {...state, [action.payload.path]: checkboxObject };
  }
  return state;
}
