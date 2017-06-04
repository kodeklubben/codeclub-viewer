import {localstorageStoreWelcomeBox} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_WELCOMEBOX':
      return localstorageStoreWelcomeBox(action.payload);
  }
  return state;
}
