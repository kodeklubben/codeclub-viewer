/*
  Example state:
    hidesDoneTasks: true
*/

export default function(state=false, action) {
  switch(action.type) {
    case 'SHOW_OR_HIDE_TASKS':
      return action.hidingState;
  }
  return state;
}
