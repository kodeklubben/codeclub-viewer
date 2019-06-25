import {storeItem} from '../utils/localStorage';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function setShowDarkMode(showDarkMode) {
  return {
    type: 'SET_SHOW_DARK_MODE',
    showDarkMode
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = false;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_SHOW_DARK_MODE':
      return storeItem('showDarkMode', (action.showDarkMode));
  }
  return state;
}
