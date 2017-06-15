import {localstorageStoreMode} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      return localstorageStoreMode(true);
    case 'SET_MODE_TEACHER':
      return localstorageStoreMode(false);
    case 'CHANGE_MODE':
      return localstorageStoreMode(!state);
    case 'SET_MODE':
      return localstorageStoreMode(action.payload);
  }

  return state;
}
