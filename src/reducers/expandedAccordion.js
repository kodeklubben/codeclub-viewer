import {storeItem} from '../utils/localStorage';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function setExpandedAccordion(course, activeKey) {
  return  {
    type: 'SET_EXPANDED_ACCORDION',
    course,
    activeKey
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = {
  /*
  expandedAccordion {
    computercraft: 0
    scratch: 2
  }
 */
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_EXPANDED_ACCORDION': {
      const {course, activeKey} = action;
      const expandedAccordion = {[course]: activeKey};
      return storeItem('expandedAccordion', expandedAccordion);
    }
  }
  return state;
}
