import {getAvailableLanguages} from '../util';
import {storeItem} from '../localStorage';


/////////////////////
// ACTION CREATORS //
/////////////////////

export function setLanguage(language) {
  return {
    type: 'SET_LANGUAGE',
    language
  };
}


/////////////
// REDUCER //
/////////////

const INITIAL_STATE = 'nb';

const isLanguageValid = (language) => getAvailableLanguages().includes(language);

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return isLanguageValid(action.language) ? storeItem('language', action.language) : state;
  }

  return state;
}
