export default function(state='', action) {
  switch(action.type) {
    case 'SET_USER_PROGRESS':
      return action.payload
    default:
      return {
        ...state
      }
  }
}