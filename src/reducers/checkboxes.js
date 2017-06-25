import {storeItem} from '../localStorage';

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_CHECKBOXES':
      return {...state,
        [action.payload.path]: storeItem(action.payload.path, action.payload.checkboxes) };
  }
  return state;
}
