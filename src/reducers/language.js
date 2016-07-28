export default function(state='nb', action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return isLanguageValid(action.payload) ? action.payload : null;
  }
  return state;
}

function isLanguageValid(language) {
  const languages = ['nb','nn','sv','da','en'];

  return languages.indexOf(language) > -1;
}
