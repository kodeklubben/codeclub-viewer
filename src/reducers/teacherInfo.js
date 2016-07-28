export default function(state={}, action) {
  switch (action.type) {
    case 'SET_TEACHER_INFO':
      return action.payload.teacherInfo;
  }

  return state;
}
