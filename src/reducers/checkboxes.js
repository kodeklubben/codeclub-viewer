import {storeItem} from '../localStorage';
import {createCheckboxesKey as createKey} from '../util';

/////////////////////
// ACTION CREATORS //
/////////////////////

export function setCheckbox(path, hash, value) {
  return {
    type: 'SET_CHECKBOX',
    payload: {
      path,
      hash,
      value
    }
  };
}

export function setCheckboxes(path, checkboxes) {
  return {
    type: 'SET_CHECKBOXES',
    payload: {
      path,
      checkboxes
    }
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = {
  /*
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
   */
};

const newCheckboxState = (state, key, checkboxes) => ({
  ...state,
  [key]: storeItem(key, checkboxes)
});

export default function(state = INITIAL_STATE, action) {
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
