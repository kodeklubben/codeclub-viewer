/////////////////////
// ACTION CREATORS //
/////////////////////

export function setHydrationComplete() {
  return {
    type: 'SET_HYDRATION_COMPLETE',
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = false;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_HYDRATION_COMPLETE':
      return true;
  }
  return state;
}
