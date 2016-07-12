function handleCheckConstraint(state, constraint) {
  if (constraint == null) return state;

  constraint = constraint.toLowerCase();

  // Check if state contains constraint that was checked
  if (!state.hasOwnProperty(constraint))return state;

  // Create next state
  const checked = state[constraint];
  return {...state, [constraint]: !checked};
}

// Set all tags to false
function resetConstraintFilter(state) {
  const constraints = Object.keys(state);
  return constraints.reduce((res, constraint) => (
    {...res, [constraint]: false}
  ), {});
}

export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_CONSTRAINT_FILTER':
      return action.payload.constraints;
    case 'RESET_FILTER':
      return resetConstraintFilter(state);
    case 'CONSTRAINT_CHECKED':
      return handleCheckConstraint(state, action.payload.constraint);
  }
  return state;
}
