export default function(state=true, action) {
  switch(action.type) {
    case 'SET_COLLAPSEDFILTER':
      return !state;
  }
  return state;
}
