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

const lessonPathArray = Object.keys(lessons).map((key) => lessons[key]['path']);
const coursePathArray = courses.map((course) => course.slice(1).replace(/\/index\.md/i, '')); // Remove leading '.'
const readmePathArray = readmePaths.map((readmePath) => readmePath.slice(1).replace(/\.md/i, '')); // Remove leading '.'

/**
 * Redirects to /PageNotFound
 *
 * @param replace
 * @param path
 * @param basename is defined in historyOptions, e.g. '/beta'
 */
const redirectToPageNotFound = (replace, path, basename = '') => {
  if (basename) { path = basename + path; }
  if (typeof document !== 'undefined') { // Only replace in the browser
    replace({pathname: '/PageNotFound', state: path});
  } else {
    console.error('ERROR: The path', location.pathname, 'is not valid!');
  }
};

const checkCourse = ({params, location}, replace) => {
  // Construct path explicitly instead of relying on location.pathname, which depends on originating link
  const path = `/${params.course}`;
  if (!coursePathArray.includes(path)) {
    redirectToPageNotFound(replace, path, location.basename);
  }
};

const checkLesson = ({params, location}, replace) => {
  // Construct path explicitly instead of relying on location.pathname, which depends on originating link
  const path = `/${params.course}/${params.lesson}/${params.file}`;
  if (!lessonPathArray.includes(location.pathname) && !readmePathArray.includes(location.pathname)) {
    redirectToPageNotFound(replace, path, location.basename);
  }
};

/**
 * Replaces the current URL (/PageNotFound) with the the URL either typed in by the user
 * or the URL given by a broken link.
 * History is used directly because react-router does not provide the necesary functionallity
 * to replace the URL without a page refresh.
 */
const saveURL = (nextState) => {
  let missingPage;
  if(typeof sessionStorage !== 'undefined' && 'missingPage' in sessionStorage) {
    // Get missing page saved in 404.html
    missingPage = sessionStorage.missingPage;
    delete sessionStorage.missingPage;
  }
  if (!missingPage && nextState.location.state) {
    // Get missing page from function 'pageNotFound'
    missingPage = nextState.location.state;
  }
  if (missingPage && typeof history !== 'undefined' && history.replaceState) {
    history.replaceState(null, null, missingPage);
  }

};

/**
 * Rewrites /index* to / and removes .html from the end of any path.
 * Keeps query parameters unchanged (e.g. ?a=1&b=2, found in location.search)
 */
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
    <IndexRoute component={FrontPage}/>
    <Route path="/PageNotFound" component={PageNotFound} onEnter={saveURL}/>
    <Route path="/:course" component={PlaylistPage} onEnter={checkCourse}/>
    <Route path="/:course/:lesson/:file" component={Lesson} onEnter={checkLesson}/>
    <Route path="*" component={PageNotFound}/>
  </Route>;

export default routes;
