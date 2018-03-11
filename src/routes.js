/* eslint-env node */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from './pages/App';
import FrontPage from './pages/FrontPage';
import PageNotFound from './pages/PageNotFound';
import Lesson from './components/Lesson/Lesson';
import PlaylistPage from './pages/PlaylistPage';

import {courseContext, readmeContext} from './contexts';
import {getLessonData} from './util';

const lessons = getLessonData();
const courses = courseContext.keys();
const readmePaths = readmeContext.keys();

const lessonArray = Object.keys(lessons).map((key) => lessons[key]['path']);
const courseArray = courses.map((course) => course.slice(1).replace(/\/index\.md/i, ''));
const readmeArray = readmePaths.map((readmePath) => readmePath.slice(1).replace(/\.md/i, ''));

const validPathTest = (lesson, path) => {
  if(lesson){
    return (lessonArray.includes(path));
  }else{
    return (courseArray.includes(path));
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
  if(path.endsWith('/')){
    path = path.slice(0, -1);
  }
  const isReadme = readmeArray.includes(path);
  const pathCorrect = validPathTest(params.lesson, path);

  if(!pathCorrect && !isReadme){
    if (typeof document !== 'undefined') {
      // Only replace in the browser
      replace({pathname: '/PageNotFound', state: path});
    } else {
      console.error('ERROR: The path', path, 'is not valid!');
    }
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
  if(typeof history !== 'undefined' && history.replaceState){
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

const rewritePath = (nextState, replace) => {
  const nextpath = nextState.location.pathname;
  if (nextpath.startsWith('/index')) {
    if (typeof document !== 'undefined') {
      replace('/' + nextState.location.search);
    } else {
      console.error('The router cannot handle paths that start with /index' +
        ' when rendering static pages (' + nextpath + ')');
    }
  }
  else if (nextpath.endsWith('.html')) {
    if (typeof document !== 'undefined') {
      replace(nextpath.replace(/\.html$/, '') + nextState.location.search);
    } else {
      console.error('The router cannot handle paths that end in .html' +
        ' when rendering static pages (' + nextpath + ')');
    }
  }
};

const appOnEnter = (nextState, replace) => {
  rewritePath(nextState, replace);
};

const appOnChange = (prevState, nextState, replace) => {
  rewritePath(nextState, replace);
};

/**
 * IMPORTANT:
 * When adding new routes, especially dynamic ones (on the form path="/:somePath")
 * remember to add validity testing in pathTest and if needed in validPathTest to make
 * the 404 routing work properly.
 */
const routes =
  <Route path="/" component={App} onEnter={appOnEnter} onChange={appOnChange}>
    <IndexRoute component={FrontPage} onEnter={serverSideRedirectCheck}/>
    <Route path="/PageNotFound" component={PageNotFound} onEnter={saveURL}/>
    <Route path="/:course" component={PlaylistPage} onEnter={pathTest}/>
    <Route path="/:course/:lesson/:file" component={Lesson} onEnter={pathTest}/>
    <Route path="*" component={PageNotFound}/>
  </Route>;

export default routes;
