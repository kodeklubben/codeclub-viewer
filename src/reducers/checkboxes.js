/*
  Example state:

  checkboxes: {
    checkboxes_scratch/astrokatt/astrokatt: {
      104227806: true,
      858451434: true,
      1317817857: true,
      2417258607: false,
      2774908712: true,
      2823855066: true,
      3166765754: true,
      ...
    },
    checkboxes_scratch/soloball/soloball: {
      667555411: false,
      1017961787: false,
      1190792545: false,
      1260979951: false,
      1446858584: false,
      ...
    },
    ...
  }
 */

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
