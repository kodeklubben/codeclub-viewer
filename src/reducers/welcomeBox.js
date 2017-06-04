import {localstorageStoreWelcomeBox} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_WELCOMEBOX':
      localstorageStoreWelcomeBox(action.payload);
      return action.payload;
  }
  return state;
}
