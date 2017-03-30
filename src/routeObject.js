import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './pages/App';
import NotFound from './pages/PageNotFound';
import store from './store';

const lessons = store.getState().lessons;
const courses = store.getState().context['courseContext'].keys();

const lessonArray = Object.keys(lessons).map((key) => lessons[key]['path']);
const courseArray = courses.map((course) => course.slice(1).replace(/\/index.md/i, ''));

const validPathTest = (lesson, path) => {
  if(lesson){
    return (lessonArray.indexOf(path) > -1);
  }else{
    return (courseArray.indexOf(path) > -1);
  }
};

const pathTest = (nextState, replace, callback) => {
  const params = nextState.params;
  let path = nextState.location.pathname;
  if(path.indexOf('/') !== 0){
    path = '/' + path;
  }
  if(path.lastIndexOf('/') === path.length-1){
    path = path.slice(0, -1);
  }
  
  const pathCorrect = validPathTest(params.lesson, path);

  if(!pathCorrect){
    replace({pathname:'/PageNotFound', query: {prevPath: path}});
  }
  callback();
};

const saveURL = (nextState, replace, callback) => {
  const path = nextState.location.query.prevPath;
  history.replaceState(null, null, path);
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
      <Route path="/PageNotFound" component={NotFound} onEnter={saveURL}/>
      <Route path="/:course" getComponent={getComponentPlaylist} onEnter={pathTest}/>
      <Route path="/:course/:lesson/:file" getComponent={getComponentLessonPage} onEnter={pathTest}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
