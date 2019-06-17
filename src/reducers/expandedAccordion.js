import {storeItem} from '../utils/localStorage';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function setExpandedAccordion(activeKey) {
  return  {
    type: 'SET_EXPANDED_ACCORDION',
    activeKey
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = -1;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_EXPANDED_ACCORDION':
      return storeItem('expandedAccordion', action.activeKey);
  }
  return state;
}
