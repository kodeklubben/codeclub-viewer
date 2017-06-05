export const localstorageStoreWelcomeBox = (welcomeBox) => {
  try {
    localStorage.setItem('welcomeBox', welcomeBox);
  }
  catch(e) {
    console.error(e);
  }
  return welcomeBox;
};

export const localstorageStoreLanguage = (language) => {
  try {
    localStorage.setItem('language', language);
  }
  catch(e) {
    console.error(e);
  }
  return language;
};

export const localstorageStoreMode = (isStudentMode) => {
  try {
    localStorage.setItem('isStudentMode', isStudentMode);
  }
  catch(e) {
    console.error(e);
  }
  return isStudentMode;
};
