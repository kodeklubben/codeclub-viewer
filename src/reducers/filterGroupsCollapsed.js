/*
  Example state:
  filterGroupsCollapsed {
    language: false
    topic: true
    subject: false
    grade: false
  }
 */

export default function(state={}, action) {
  switch(action.type) {
    case 'COLLAPSE_FILTERGROUP': {
      const {name, collapsed} = action;
      return {...state, [name]: collapsed};
    }
  }
  return state;
}
