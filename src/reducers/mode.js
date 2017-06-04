import {localstorageStoreMode} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      localstorageStoreMode(true);
      return true;
    case 'SET_MODE_TEACHER':
      localstorageStoreMode(false);
      return false;
    case 'CHANGE_MODE':
      localstorageStoreMode(!state);
      return !state;
    case 'SET_MODE':
      localstorageStoreMode(action.payload);
      return action.payload;
  }

  return state;
}
