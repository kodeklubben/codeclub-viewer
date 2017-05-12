import store from './store';
import {setLocalStorage} from './action_creators';

const defaultLocalStorage = { 'hideWelcomeBox': false, 'lastLanguage': 'nb',
  'studentMode': true, 'lastLesson': '' };
const setItems = () => {
  localStorage.setItem(defaultLocalStorage, JSON.stringify(defaultLocalStorage));
};

//Introduces localStorage
export const loadLocalStorage = () => {
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
};

export const doNotShowAgain = () => {
  defaultLocalStorage.hideWelcomeBox = true;
  setItems();
  store.dispatch(setLocalStorage(defaultLocalStorage));
};

export const rememberLanguage = (language) => {
  defaultLocalStorage.lastLanguage = language;
  setItems();
};

export const rememberMode = (isStudentMode) => {
  defaultLocalStorage.studentMode = isStudentMode;
  setItems();
};

export const rememberLesson = (lessonPath) => {
  defaultLocalStorage.studentMode = lessonPath;
  setItems();
};
