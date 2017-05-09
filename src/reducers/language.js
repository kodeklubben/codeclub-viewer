import {rememberLanguage} from '../localStorage';

export default function(state='nb', action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      rememberLanguage(action.payload);
      return isLanguageValid(action.payload) ? action.payload : state;
  }

  return state;
}

function isLanguageValid(language) {
  const languages = ['nb','nn','sv','da','en'];

  return languages.indexOf(language) > -1;
}
