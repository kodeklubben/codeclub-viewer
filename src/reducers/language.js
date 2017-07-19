/*
  Example state:

  language: "nb"
 */

import {getAvailableLanguages} from '../util';
import {storeItem} from '../localStorage';

export default function(state='nb', action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return isLanguageValid(action.language) ? storeItem('language', action.language) : state;
  }

  return state;
}

function isLanguageValid(language) {
  return getAvailableLanguages().indexOf(language) !== -1;
}
