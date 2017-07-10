import {getAvailableLanguages} from '../util';
import {storeItem} from '../localStorage';

export default function(state='nb', action) {
  const newLanguage =  isLanguageValid(action.payload) ? action.payload : state;
  switch (action.type) {
    case 'SET_LANGUAGE':
      return storeItem('language', newLanguage);
  }

  return state;
}

function isLanguageValid(language) {
  return getAvailableLanguages().hasOwnProperty(language);
}
