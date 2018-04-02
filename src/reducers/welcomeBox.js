import {storeItem} from '../localStorage';


/////////////////////
// ACTION CREATORS //
/////////////////////

export function setWelcomeBox(welcomeBox) {
  return {
    type: 'SET_WELCOMEBOX',
    payload: welcomeBox
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = true;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_WELCOMEBOX':
      return storeItem('welcomeBox', (action.payload));
  }
  return state;
}
