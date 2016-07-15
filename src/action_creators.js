export function setLessons(lessons) {
  return {
    type: 'SET_LESSONS',
    payload: {
      lessons
    }
  };
}

export function setFilter(filter) {
  return {
    type: 'SET_FILTER',
    payload: {
      filter
    }
  };
}

export function resetFilter() {
  return {
    type: 'RESET_FILTER'
  };
}

export function setContext(contextName, context) {
  return {
    type: 'SET_CONTEXT',
    payload: {
      contextName,
      context
    }
  };
}

export function onFilterCheck(groupName, tagName) {
  return {
    type: 'FILTER_CHECKED',
    payload: {
      groupName,
      tagName
    }
  };
}

export function setModeStudent() {
  return {
    type: 'SET_MODE_STUDENT'
  };
}

export function setModeTeacher() {
  return {
    type: 'SET_MODE_TEACHER'
  };
}

export function changeMode() {
  return {
    type: 'CHANGE_MODE'
  };
}

export function setLanguageNorway() {
  return {
    type: 'SET_LANGUAGE_NORWAY'
  };
}

export function setLanguageSweden() {
  return {
    type: 'SET_LANGUAGE_SWEDEN'
  };
}

export function setLanguageDenmark() {
  return {
    type: 'SET_LANGUAGE_DENMARK'
  };
}
