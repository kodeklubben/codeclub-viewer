import {doNotShowAgain, defaultLocalStorage} from '../localStorage';

export default function(state=false, action) {
  switch(action.type) {
    case 'SHOW_WELCOME_BOX':
      return false;
    case 'HIDE_WELCOME_BOX':
      doNotShowAgain();
      return true;
    case 'SET_WELCOME_BOX':
      return defaultLocalStorage.hideWelcomeBox;
  }
  return state;
}
