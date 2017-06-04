export const localstorageStoreWelcomeBox = (welcomeBox) => {
  localStorage.setItem('welcomeBox', welcomeBox);
};

export const localstorageStoreLanguage = (language) => {
  localStorage.setItem('language', language);
};

export const localstorageStoreMode = (isStudentMode) => {
  localStorage.setItem('isStudentMode', isStudentMode);
};
