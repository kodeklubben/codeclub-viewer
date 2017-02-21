import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './pages/App';
import NotFound from './pages/PageNotFound';
import store from './store';

const validPathTest = (course, lesson, path) => {
  const lessons = store.getState().lessons;
  let key;

  if(!lesson){
    for(key in lessons){
      if(course === lessons[key]['course']){
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
  const path = nextState.location.pathname;
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
