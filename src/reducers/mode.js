export default function(state={}, action) {
  switch(action.type) {
    case 'SET_MODE_STUDENT':
      state = {...state, mode: true};
      break;
    case 'SET_MODE_TEACHER':
      state = {...state, mode: false};
      break;
    case 'CHANGE_MODE':
      state = {...state , mode: !state.mode};
      break;
  }

  return state;
}
