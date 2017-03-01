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

export function setLanguage(language) {
  return {
    type: 'SET_LANGUAGE',
    payload: language
  };
}

export function setTeacherInfo(teacherInfo) {
  return {
    type: 'SET_TEACHER_INFO',
    payload: {
      teacherInfo
    }
  };
}
