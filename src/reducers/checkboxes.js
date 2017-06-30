import {storeItem} from '../localStorage';
import {createCheckboxesKey as createKey} from '../util';

const newCheckboxState = (state, key, checkboxes) => ({
  ...state,
  [key]: storeItem(key, checkboxes)
});

export default function(state={}, action) {
  switch(action.type) {
    case 'SET_CHECKBOXES': {
      const {path, checkboxes} = action.payload;
      return newCheckboxState(state, createKey(path), checkboxes);
    }
    case 'SET_CHECKBOX': {
      const {path, hash, value} = action.payload;
      const key = createKey(path);
      const checkboxes = {
        ...(state[key] || {}), // Get checkboxes if it exists, and create a copy...
        [hash]: value          // ...and add the new value.
      };
      return newCheckboxState(state, key, checkboxes);
    }
  }
  return state;
}
