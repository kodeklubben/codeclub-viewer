import {storeItem} from '../localStorage';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function setLastLesson(path) {
  return  {
    type: 'SET_LASTLESSON',
    path
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = '';

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_LASTLESSON':
      return storeItem('lastLesson', action.path);
  }
  return state;
}
