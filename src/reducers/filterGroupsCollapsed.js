/////////////////////
// ACTION CREATORS //
/////////////////////

export function collapseFilterGroup(name, collapsed) {
  return {
    type: 'COLLAPSE_FILTERGROUP',
    name,
    collapsed
  };
}

export function collapseAllFilterGroups(collapsed) {
  return {
    type: 'COLLAPSE_ALL_FILTERGROUPS',
    collapsed
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = {
  /*
  filterGroupsCollapsed {
    language: false
    topic: true
    subject: false
    grade: false
  }
 */
};

export default function(state = INITIAL_STATE, action) {

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
