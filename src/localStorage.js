export const showWelcomeBox = () => {
  localStorage.setItem('welcomeBox', true);
};

export const doNotShowAgain = () => {
  localStorage.setItem('welcomeBox', false);
};

export const rememberLanguage = (language) => {
  localStorage.setItem('lastLanguage', language);
};

export const rememberMode = (isStudentMode) => {
  localStorage.setItem('studentMode', isStudentMode);
};
