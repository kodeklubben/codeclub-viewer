import {storeItem} from '../localStorage';


/////////////////////
// ACTION CREATORS //
/////////////////////

export function setModeStudent() {
  return {
    type: 'SET_MODE_STUDENT'
  };
}

export function setModeTeacher() {
  return {
    type: 'SET_MODE_TEACHER'
  };
}

export function setMode(mode) {
  return {
    type: 'SET_MODE',
    payload: mode
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = true;

export default function(state = INITIAL_STATE, action) {
  const isStudentMode = 'isStudentMode';
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      return storeItem(isStudentMode, true);
    case 'SET_MODE_TEACHER':
      return storeItem(isStudentMode, false);
    case 'SET_MODE':
      return storeItem(isStudentMode, action.payload);
  }

  return state;
}
