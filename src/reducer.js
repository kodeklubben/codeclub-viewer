import {filterCourses} from './util';

function setCourses(state, courses) {
  const nextState = {...state};
  nextState.courses = courses;
  return nextState;
}

function setAllCourses(state, courses) {
  const nextState = {...state};
  nextState.allCourses = courses;
  return nextState;
}

function setFilter(state, filter) {
  const nextState = {...state};
  nextState.filter = filter;
  return nextState;
}


function handleCheckFilter(state, groupName, tagName){
  if(groupName == null || tagName == null) return state;
  
  groupName = groupName.toLowerCase();
  tagName = tagName.toLowerCase();
  
  // Check if state contains the filterItem that was checked
  // This should always be false, but it's better to be safe than sorry
  if(!state.hasOwnProperty('filter') || !state.filter.hasOwnProperty(groupName) ||
    !state.filter[groupName].hasOwnProperty(tagName))return state;
  
  // Create next state and get state of checkbox
  const nextState = {...state};
  const checked = state.filter[groupName][tagName];
  
  // Update next state
  nextState.filter[groupName][tagName] = !checked;
  nextState.courses = filterCourses(state.allCourses || [], state.filter);
  
  return nextState;
}

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_COURSES':
      return setCourses(state, action.payload.courses);
    case 'SET_ALL_COURSES':
      return setAllCourses(state, action.payload.courses);
    case 'SET_FILTER':
      return setFilter(state, action.payload.filter);
    case 'FILTER_CHECKED':
      return handleCheckFilter(state, action.payload.groupName, action.payload.tagName);
  }
  return state;
}
