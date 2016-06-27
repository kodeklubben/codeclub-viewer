export default function(state={}, action) {
  switch(action.type) {
    case 'SET_ALL_COURSES':
      return action.payload.courses;
  }
  return state;
}
