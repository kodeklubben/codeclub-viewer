import {storeItem} from '../localStorage';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function setShowDyslexicFont(showDyslexicFont) {
  return {
    type: 'SET_SHOW_DYSLEXICFONT',
    showDyslexicFont
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = false;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_SHOW_DYSLEXICFONT':
      return storeItem('showDyslexicFont', (action.showDyslexicFont));
  }
  return state;
}
