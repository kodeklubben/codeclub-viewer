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

function handleCheckFilter(state, groupKey, tagKey){
  if(groupKey == null || tagKey == null) return state;

  // Check if state contains the filterItem that was checked
  // This should always be false, but it's better to be safe than sorry
  if(!state.hasOwnProperty(groupKey) || !state[groupKey].hasOwnProperty(tagKey)) {
    return state;
  }

  // Create next state
  const checked = state[groupKey][tagKey];
  return {
    ...state,
    [groupKey]: {
      ...state[groupKey],
      [tagKey]: !checked
    }
  };

}

// Set all tags to false
function resetFilter(state, groupKey, tagKey) {
  const filterGroups = Object.keys(state);
  return filterGroups.reduce((res, filterGroup) => {
    const tags = state[filterGroup];
    res[filterGroup] = Object.keys(tags).reduce((tagsRes, tag) => ({...tagsRes, [tag]: false}), {});
    if(groupKey && tagKey){
      res[groupKey][tagKey] = true;
    }
    return res;
  },{});
}

export default function(state={}, action) {

  switch(action.type) {
    case 'SET_FILTER':
      return action.filter;
    case 'RESET_FILTER':
      return resetFilter(state, action.groupKey, action.tagKey);
    case 'FILTER_CHECKED':
      return handleCheckFilter(state, action.groupKey, action.tagKey);
  }
  return state;
}
