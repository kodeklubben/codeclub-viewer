export default function(state='norway', action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return isLanguageValid(action.payload) ? action.payload : null;
  }
  return state;
}

function isLanguageValid(language) {
  const languages = [
    'norway',
    'norway-nynorsk',
    'sweden',
    'denmark',
    'england'
  ];

  return languages.indexOf(language) > -1;
}
