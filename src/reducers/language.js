import {getAvailableLanguages} from '../util';

export default function(state='nb', action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return isLanguageValid(action.payload) ? action.payload : state;
  }

  return state;
}

function isLanguageValid(language) {
  const languages = getAvailableLanguages();

  return Object.keys(languages).indexOf(language) > -1;
}
