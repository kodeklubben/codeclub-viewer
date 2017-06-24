import {storeItem} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_WELCOMEBOX':
      return storeItem('welcomeBox', (action.payload));
  }
  return state;
}
