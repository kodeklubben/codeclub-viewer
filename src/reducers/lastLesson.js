import {storeItem} from '../localStorage';

export default function(state='', action) {
  switch(action.type) {
    case 'SET_LASTLESSON':
      return storeItem('lastLesson', action.path);
  }
  return state;
}
