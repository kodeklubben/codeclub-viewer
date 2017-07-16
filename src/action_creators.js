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

export function resetFilter(groupName = {}, tagName = {}) {
  return {
    type: 'RESET_FILTER',
    payload: {
      groupName,
      tagName
    }
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

export function setMode(mode) {
  return {
    type: 'SET_MODE',
    payload: mode
  };
}

export function setLanguage(language) {
  return {
    type: 'SET_LANGUAGE',
    payload: language
  };
}

export function setWelcomeBox(welcomeBox) {
  return {
    type: 'SET_WELCOMEBOX',
    payload: welcomeBox
  };
}

export function setCheckbox(path, hash, value) {
  return {
    type: 'SET_CHECKBOX',
    payload: {
      path,
      hash,
      value
    }
  };
}

export function setCheckboxes(path, checkboxes) {
  return {
    type: 'SET_CHECKBOXES',
    payload: {
      path,
      checkboxes
    }
  };
}
