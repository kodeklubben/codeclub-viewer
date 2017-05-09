import store from './store';
import {setLocalStorage} from './action_creators';
const defaultLocalStorage = { 'hideWelcomeBox': false, 'lastLanguage': 'nb', 'studentMode': true, 'lastLesson': 0 };

//Introduces localStorage
export function loadLocalStorage() {
  if (typeof(Storage) !== 'undefined') {
    if (localStorage.length === 0) {
      localStorage.setItem(defaultLocalStorage, JSON.stringify(defaultLocalStorage));
    }
  }
  else {
    console.log('Støtter ikke localStorage');
  }
  return JSON.parse(localStorage.getItem(defaultLocalStorage));
}

//Removes welcomeBox
export function doNotShowAgain() {
  defaultLocalStorage.hideWelcomeBox = true;
  localStorage.setItem(defaultLocalStorage, JSON.stringify(defaultLocalStorage));
  store.dispatch(setLocalStorage(defaultLocalStorage));
}

//Adds language to localStorage
export function rememberLanguage(language) {
  defaultLocalStorage.lastLanguage = language;
  localStorage.setItem(defaultLocalStorage, JSON.stringify(defaultLocalStorage));
}

export function rememberMode(isStudentMode) {
  defaultLocalStorage.studentMode = isStudentMode;
  localStorage.setItem(defaultLocalStorage, JSON.stringify(defaultLocalStorage));
}
