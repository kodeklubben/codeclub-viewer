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
