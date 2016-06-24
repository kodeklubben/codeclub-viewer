export function setCourses(courses) {
  return {
    type: 'SET_COURSES',
    payload: {
      courses
    }
  };
}

export function setAllCourses(courses) {
  return {
    type: 'SET_ALL_COURSES',
    payload: {
      courses
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

export function onFilterCheck(groupName, tagName) {
  return {
    type: 'FILTER_CHECKED',
    payload: {
      groupName,
      tagName
    }
  };
}
