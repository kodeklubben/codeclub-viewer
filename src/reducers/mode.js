export default function(state=true, action) {
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      return true;
    case 'SET_MODE_TEACHER':
      return false;
    case 'CHANGE_MODE':
      return !state;
  }

  return state;
}
