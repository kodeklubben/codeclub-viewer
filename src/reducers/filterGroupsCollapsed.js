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
    case 'COLLAPSE_ALL_FILTERGROUPS': {
      const {collapsed} = action;
      return Object.keys(state).reduce((result, groupKey) => {
        result[groupKey] = collapsed;
        return result;
      }, {});
    }
  }
  return state;
}
