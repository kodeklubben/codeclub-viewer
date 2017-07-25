/*
  Example state:
  collapsedFilter: {
    mainfilter: false
  }
 */

const collapseObject = (state, key) => ({...state, [key]: !!state});

export default function(state=false, action) {
  switch(action.type) {
    case 'SET_COLLAPSEDFILTER':
      return collapseObject(state, action.name);
  }
  return state;
}
