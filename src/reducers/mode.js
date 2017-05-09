export default function(state=true, action) {
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      return true;
    case 'SET_MODE_TEACHER':
      return false;
    case 'CHANGE_MODE':
      return !state;
    case 'SET_MODE':
      return action.payload;
  }

  return state;
}
