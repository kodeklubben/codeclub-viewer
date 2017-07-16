/*
  Example state:
  
  filter: {
    language: {
      nb: true,
      nn: true,
      en: false
    },
    tema: {
      app: true,
      electronics: false,
      block_based: false,
      minecraft: false,
      web: false,
      game: true,
      robot: false,
      animation: false
    }
  }
*/

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
function resetFilter(state, groupName, tagName) {
  const filterGroups = Object.keys(state);
  return filterGroups.reduce((res, filterGroup) => {
    const tags = state[filterGroup];
    res[filterGroup] = Object.keys(tags).reduce((tagsRes, tag) => ({...tagsRes, [tag]: false}), {});
    if(groupName && tagName){
      res[groupName][tagName] = true;
    }
    return res;
  },{});
}

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter;
    case 'RESET_FILTER':
      return resetFilter(state, action.groupName, action.tagName);
    case 'FILTER_CHECKED':
      return handleCheckFilter(state, action.groupName, action.tagName);
  }
  return state;
}
