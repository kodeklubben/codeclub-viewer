/*
  Example state:
  filterGroupsCollapse {
    language: false
    topic: true
    subject: false
    grade: false
  }
 */

const newCollapseState = (state, key, bool) => ({...state, [key]: bool});

export default function(state={}, action) {
  switch(action.type) {
    case 'SHOW_FILTERGROUPS': {
      const {name, bool} = action.payload;
      return newCollapseState(state, name, bool);
    }
  }
  return state;
}
