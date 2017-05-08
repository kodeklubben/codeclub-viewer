import store from './store';
import {setLocalStorage} from './action_creators';
const localStorageItems = { 'hideWelcomeBox': false, 'lastLanguage': 'nb', 'lastLesson': 0 };

//Introduces localStorage
export function loadLocalStorage() {
  if (typeof(Storage) !== 'undefined') {
    if (localStorage.length === 0) {
      localStorage.setItem(localStorageItems, JSON.stringify(localStorageItems));
    }
  }
  else {
    console.log('Støtter ikke localStorage');
  }
  return JSON.parse(localStorage.getItem(localStorageItems));
}

//Removes welcomeBox
export function doNotShowAgain() {
  localStorageItems.hideWelcomeBox = true;
  localStorage.setItem(localStorageItems, JSON.stringify(localStorageItems));
  store.dispatch(setLocalStorage(localStorageItems));
}

//Adds language to localStorage
export function rememberLanguage(language) {
  localStorageItems.lastLanguage = language;
  localStorage.setItem(localStorageItems, JSON.stringify(localStorageItems));
}
