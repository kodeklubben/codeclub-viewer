function setContext(state, contextName, context) {
  return {...state, [contextName]: context};
}

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_CONTEXT':
      return setContext(state, action.payload.contextName, action.payload.context);
  }
  return state;
}
