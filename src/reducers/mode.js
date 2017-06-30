import {storeItem} from '../localStorage';

export default function(state=true, action) {
  const isStudentMode = 'isStudentMode';
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      return storeItem(isStudentMode, true);
    case 'SET_MODE_TEACHER':
      return storeItem(isStudentMode, false);
    case 'CHANGE_MODE':
      return storeItem(isStudentMode, !state);
    case 'SET_MODE':
      return storeItem(isStudentMode, action.payload);
  }

  return state;
}
