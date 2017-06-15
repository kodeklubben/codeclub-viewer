import {localstorageStoreLanguage} from '../localStorage';

export default function(state='nb', action) {
  const newLanguage =  isLanguageValid(action.payload) ? action.payload : state;
  switch (action.type) {
    case 'SET_LANGUAGE':
      return localstorageStoreLanguage(newLanguage);
  }

  return state;
}

function isLanguageValid(language) {
  const languages = ['nb','nn','sv','da','en'];

  return languages.indexOf(language) > -1;
}
