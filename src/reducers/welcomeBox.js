import {showWelcomeBox, doNotShowAgain} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_WELCOMEBOX':
      showWelcomeBox();
      return true;
    case 'SET_BUTTON':
      doNotShowAgain();
      return false;
  }
  return state;
}
