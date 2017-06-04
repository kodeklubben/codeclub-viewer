export const localstorageStoreWelcomeBox = (welcomeBox) => {
  localStorage.setItem('welcomeBox', welcomeBox);
  return welcomeBox;
};

export const localstorageStoreLanguage = (language) => {
  localStorage.setItem('language', language);
  return language;
};

export const localstorageStoreMode = (isStudentMode) => {
  localStorage.setItem('isStudentMode', isStudentMode);
  return isStudentMode;
};
