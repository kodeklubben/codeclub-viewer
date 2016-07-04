export default function(state={}, action) {
  switch(action.type) {
    case 'SET_LESSONS':
      return action.payload.lessons;
  }
  return state;
}
