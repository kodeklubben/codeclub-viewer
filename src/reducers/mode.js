import {rememberMode} from '../localStorage';

export default function(state=true, action) {
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      rememberMode(true);
      return true;
    case 'SET_MODE_TEACHER':
      rememberMode(false);
      return false;
    case 'CHANGE_MODE':
      rememberMode(!state);
      return !state;
    case 'SET_MODE':
      rememberMode(action.payload);
      return action.payload;
  }

  return state;
}
