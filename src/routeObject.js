import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './pages/App';
import NotFound from './pages/PageNotFound';
import store from './store';

const lessons = store.getState().lessons;
const courses = store.getState().context['courseContext'].keys();

const getCleanCoursePaths = (courseArray) => {
  let count;

  for(count = 0; count < courseArray.length; count++){
    courseArray[count] = courseArray[count].slice(1);
    courseArray[count] = courseArray[count].replace(/\/index.md/i, '');
  }
  return courseArray;
};

const getLessonPaths = (lessonObject) => {
  let innerObject;
  let lessonArray = [];

  for(innerObject in lessonObject){
    lessonArray.push(lessonObject[innerObject]['path']);
  }
  return lessonArray;
};

const lessonArray = getLessonPaths(lessons);
const courseArray = getCleanCoursePaths(courses);

const validPathTest = (lesson, path) => {
  if(lesson){
    if(lessonArray.indexOf(path) > -1){
      return true;
    }
    return false;
  }else{
    if(courseArray.indexOf(path) > -1){
      return true;
    }
    return false;
  }
};

const pathTest = (nextState, replace, callback) => {
  const params = nextState.params;
  let path = nextState.location.pathname;
  if(!(path.indexOf('/') === 0)){
    path = '/' + path;
  }
  if(path.lastIndexOf('/') === path.length-1){
    path = path.slice(0, -1);
  }
  
  const pathCorrect = validPathTest(params.lesson, path);

  if(!pathCorrect){
    replace('/PageNotFound');
  }
  callback();
};

export default function getRouteObject(
  getComponentFrontPage,
  getComponentPlaylist,
  getComponentLessonPage
) {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getComponentFrontPage}/>
      <Route path="/PageNotFound" component={NotFound}/>
      <Route path="/:course" getComponent={getComponentPlaylist} onEnter={pathTest}/>
      <Route path="/:course/:lesson/:file" getComponent={getComponentLessonPage} onEnter={pathTest}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
