export default function(state='norwegian', action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return isLanguageValid(action.payload) ? action.payload : null;
  }
  return state;
}

function isLanguageValid(language) {
  const languages = [
    'norwegian',
    'norwegian-nynorsk',
    'swedish',
    'danish',
    'english'
  ];

  return languages.indexOf(language) > -1;
}
