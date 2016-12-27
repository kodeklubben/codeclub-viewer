export default function(state={}, action) {
  switch (action.type) {
    case 'SET_TEACHER_INFO':
      return isValidPayload(action)
        ? action.payload.teacherInfo
        : state;
  }

  return state;
}

function isValidPayload(action) {
  return action.payload.teacherInfo != null;
}
