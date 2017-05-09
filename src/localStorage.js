import store from './store';
import {setLocalStorage} from './action_creators';
const defaultLocalStorage = { 'hideWelcomeBox': false, 'lastLanguage': 'nb',
  'studentMode': true, 'lastLesson': 0 };
const setItems = () => localStorage.setItem(defaultLocalStorage,
  JSON.stringify(defaultLocalStorage));

//Introduces localStorage
export function loadLocalStorage() {
  if (typeof(Storage) !== 'undefined') {
    if (localStorage.length === 0) {
      setItems();
    }
    else {
      console.log('Ikke første gangen');
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
  setItems();
  store.dispatch(setLocalStorage(defaultLocalStorage));
}

//Adds language to localStorage
export function rememberLanguage(language) {
  defaultLocalStorage.lastLanguage = language;
  setItems();
}

export function rememberMode(isStudentMode) {
  defaultLocalStorage.studentMode = isStudentMode;
  setItems();
}
