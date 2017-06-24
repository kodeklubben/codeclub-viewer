export const storeItem = (key, val) => {
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

export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    if (JSON.parse(localStorage[key]) === true || JSON.parse(localStorage[key]) === false) {
      return JSON.parse(localStorage[key]);
    }
    else {
      return localStorage[key];
    }
  }
  catch (e) {
    return defaultValue;
  }
};
