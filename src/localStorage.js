export const showWelcomeBox = (welcomeBox) => {
  localStorage.setItem('welcomeBox', welcomeBox);
};

export const rememberLanguage = (language) => {
  localStorage.setItem('lastLanguage', language);
};

export const rememberMode = (isStudentMode) => {
  localStorage.setItem('studentMode', isStudentMode);
};
