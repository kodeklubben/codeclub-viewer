import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './pages/App';
import NotFound from './pages/PageNotFound';
import store from './store';

const validPathTest = (course, lesson, path) => {
  const lessons = store.getState().lessons;
  const courses = store.getState().context['courseContext'].keys();
  let key;

  if(!lesson){
    for(key = 0; key < courses.length; key++){
      courses[key] = courses[key].slice(2);
      courses[key] = courses[key].replace(/\/index.md/i, '');
      if(course === courses[key]){
        return true;
      }
    }
    return false;
  }else{
    for(key in lessons){
      if(path === lessons[key]['path']){
        return true;
      }
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
    path = path.slice(0, path.length-1);
  }
  
  const pathCorrect = validPathTest(params.course, params.lesson, path);

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
