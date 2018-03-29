export function setFilter(filter) {
  return {
    type: 'SET_FILTER',
    filter
  };
}

export function resetFilter(groupKey, tagKey) {
  return {
    type: 'RESET_FILTER',
    groupKey,
    tagKey
  };
}

export function onFilterCheck(groupKey, tagKey) {
  return {
    type: 'FILTER_CHECKED',
    groupKey,
    tagKey
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

export function setMode(mode) {
  return {
    type: 'SET_MODE',
    payload: mode
  };
}

export function setLanguage(language) {
  return {
    type: 'SET_LANGUAGE',
    language
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

export function setLastLesson(path) {
  return  {
    type: 'SET_LASTLESSON',
    path
  };
}

export function collapseFilterGroup(name, collapsed) {
  return {
    type: 'COLLAPSE_FILTERGROUP',
    name,
    collapsed
  };
}

export function collapseAllFilterGroups(collapsed) {
  return {
    type: 'COLLAPSE_ALL_FILTERGROUPS',
    collapsed
  };
}
