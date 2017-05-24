//Introduces localStorage
export const loadLocalStorage = () => {
  if (typeof(Storage) !== 'undefined') {
    if (localStorage.length === 0) {
      localStorage.setItem('hideWelcomeBox', 'false');
      localStorage.setItem('lastLanguage', 'nb');
      localStorage.setItem('studentMode', 'true');
      localStorage.setItem('lastLesson', '');

    }
    else {
      console.log('Ikke første gangen');
    }
  }
  else {
    console.log('Støtter ikke localStorage');
  }
  return localStorage;
};

export const doNotShowAgain = () => {
  localStorage.setItem('hideWelcomeBox', 'true');
};

export const rememberLanguage = (language) => {
  localStorage.setItem('lastLanguage', language);
};

export const rememberMode = (isStudentMode) => {
  localStorage.setItem('studentMode', isStudentMode);
};

export const rememberLesson = (lessonPath) => {
  localStorage.setItem('lastLesson', lessonPath);
};
