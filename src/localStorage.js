import store from './store';
import {setLocalStorage} from './action_creators';
const localStorageItems = { 'hideWelcomeBox': false, 'lastLanguage': '', 'lastLesson': 0 };
console.log(localStorageItems);

//Introduces localStorage
export function loadLocalStorage() {
  if (typeof(Storage) !== 'undefined') {
    if (localStorageItems.firstTime === undefined) {
      localStorageItems.firstTime =  false;
      localStorage.setItem(localStorageItems, JSON.stringify(localStorageItems));
    }
    else {
      console.log('Ikke første gangen');
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
  if (!language) {
    localStorageItems.lastLanguage = 'nb';
    localStorage.setItem(localStorageItems, JSON.stringify(localStorageItems)); 
  }
  else {
    localStorageItems.lastLanguage = language;
    localStorage.setItem(localStorageItems, JSON.stringify(localStorageItems)); 
  }
}