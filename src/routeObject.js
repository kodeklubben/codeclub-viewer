/* eslint-env node */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './pages/App';
import NotFound from './pages/PageNotFound';
import store from './store';

const lessons = store.getState().lessons;
const courses = store.getState().context['courseContext'].keys();
const readmePaths = store.getState().context['readmeContext'].keys();

const lessonArray = Object.keys(lessons).map((key) => lessons[key]['path']);
const courseArray = courses.map((course) => course.slice(1).replace(/\/index\.md/i, ''));
const readmeArray = readmePaths.map((readmePath) => readmePath.slice(1).replace(/\.md/i, ''));

const validPathTest = (lesson, path) => {
  if(lesson){
    return (lessonArray.indexOf(path) > -1);
  }else{
    return (courseArray.indexOf(path) > -1);
  }
};

/**
* Checks if the current path is valid or if it should be treated as a 404
* When a new Route is added, functionallity for handling of the path should be added here.
* Some of the handling may be put in the validPathTest function.
*/
const pathTest = (nextState, replace) => {
  const params = nextState.params;
  let path = nextState.location.pathname;
  if(path.indexOf('/') !== 0){
    path = '/' + path;
  }
  if(path.lastIndexOf('/') === path.length-1){
    path = path.slice(0, -1);
  }
  const isReadme = readmeArray.indexOf(path) > -1;
  const pathCorrect = validPathTest(params.lesson, path);

  if(!pathCorrect && !isReadme){
    replace({pathname:'/PageNotFound', state: path});
  }
};

/**
* Replaces the current URL (/PageNotFound) with the the URL either typed in by the user
* or the URL given by a broken link.
* History is used directly because react-router does not provide the necesarry functionallity
* to replace the URL without a page refresh.
*/
const saveURL = (nextState, replace) => {
  const publicPath = process.env.PUBLICPATH_WITHOUT_SLASH;
  const path = (publicPath === '/') ? nextState.location.state : publicPath + nextState.location.state;
  if(typeof history.replaceState !== 'undefined'){
    history.replaceState(null, null, path);
  }
};

/**
* Checks if there has been passed down a redirect from 404.html.
* If so, redirects to /PageNotFound with a state that equals the URL that caused a 404.
* Happens when a server side 404 has occured.
*/
const serverSideRedirectCheck = (nextState, replace) => {
  if(typeof sessionStorage !== 'undefined'){
    let redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;

    if (redirect && redirect != nextState.location.pathname) {
      replace({pathname:'/PageNotFound', state: redirect});
    }
  }
};

/**
* IMPORTANT:
* When adding new routes, especially dynamic ones (on the form path="/:somePath")
* remember to add validity testing in pathTest and if needed in validPathTest to make
* the 404 routing work properly.
*/
export default function getRouteObject(
  getComponentFrontPage,
  getComponentPlaylist,
  getComponentLessonPage
) {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getComponentFrontPage} onEnter={serverSideRedirectCheck}/>
      <Route path="/PageNotFound" component={NotFound} onEnter={saveURL}/>
      <Route path="/:course" getComponent={getComponentPlaylist} onEnter={pathTest}/>
      <Route path="/:course/:lesson/:file" getComponent={getComponentLessonPage} onEnter={pathTest}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
