import {storeItem} from '../localStorage';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function showOnlyPlaylists(playlists) {
  return {
    type: 'SHOW_ONLY_PLAYLISTS',
    playlists
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = true;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SHOW_ONLY_PLAYLISTS':
      return storeItem('playlists', (action.playlists));
  }
  return state;
}
