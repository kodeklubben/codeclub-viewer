const storeItem = (key, val) => {
  try {
    localStorage.setItem(key, val);
  }
  catch (e) {
    // If we get here, localStorage is not defined.
    // This will always be the case during server side rendering,
    // and also for some old browsers.
    // If so, we won't be able to remember changes in localStorage for later sessions,
    // but the app should work fine anyway.
  }
  return val;
};

export const localstorageStoreWelcomeBox = (welcomeBox) => storeItem('welcomeBox', welcomeBox);
export const localstorageStoreLanguage = (language) => storeItem('language', language);
export const localstorageStoreMode = (isStudentMode) => storeItem('isStudentMode', isStudentMode);
export const localstorageStoreCheckboxes = (path, checkboxes) => {
  storeItem(path, JSON.stringify(checkboxes));
  const checkboxObject = {};
  checkboxObject[path] = checkboxes;
  return checkboxObject;
};
