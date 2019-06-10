import {storeItem} from '../utils/localStorage';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function setShowPlaylists(showPlaylists) {
  return {
    type: 'SET_SHOW_PLAYLISTS',
    showPlaylists
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = false;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_SHOW_PLAYLISTS':
      return storeItem('showPlaylists', (action.showPlaylists));
  }
  return state;
}
