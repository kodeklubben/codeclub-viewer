function handleCheckFilter(state, groupName, tagName){
  if(groupName == null || tagName == null) return state;

  groupName = groupName.toLowerCase();
  tagName = tagName.toLowerCase();

  // Check if state contains the filterItem that was checked
  // This should always be false, but it's better to be safe than sorry
  if(!state.hasOwnProperty(groupName) ||
    !state[groupName].hasOwnProperty(tagName))return state;

  // Create next state
  const checked = state[groupName][tagName];
  return {
    ...state,
    [groupName]: {
      ...state[groupName],
      [tagName]: !checked
    }
  };

}

// Set all tags to false
function resetFilter(state) {
  const filterGroups = Object.keys(state);
  return filterGroups.reduce((res, filterGroup) => {
    const tags = state[filterGroup];
    res[filterGroup] = Object.keys(tags).reduce((tagsRes, tag) => ({...tagsRes, [tag]: false}), {});
    return res;
  },{});
}

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_FILTER':
      return action.payload.filter;
    case 'RESET_FILTER':
      return resetFilter(state);
    case 'FILTER_CHECKED':
      return handleCheckFilter(state, action.payload.groupName, action.payload.tagName);
  }
  return state;
}
