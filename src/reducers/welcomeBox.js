import {showWelcomeBox} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_WELCOMEBOX':
      showWelcomeBox(true);
      return true;
    case 'SET_BUTTON':
      showWelcomeBox(false);
      return false;
  }
  return state;
}
