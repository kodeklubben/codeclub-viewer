export default function(state={}, action) {
  switch(action.type) {
    case 'SET_LOCAL_STORAGE':
      return action.payload
  }
  return state;
}