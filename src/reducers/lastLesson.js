import {storeItem} from '../localStorage';

export default function(state='', action) {
  switch(action.type) {
    case 'SET_LASTLESSON':
      return storeItem('lastLesson', '/scratch/astrokatt/astrokatt');
      //Her vil jeg bytte ut '/scratch/astrokatt/astrokatt' med action.payload.path
  }
  return state;
}
