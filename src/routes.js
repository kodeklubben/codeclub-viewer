/* eslint-env node */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from './pages/App';
import FrontPage from './pages/FrontPage';
import PageNotFound from './pages/PageNotFound';
import Lesson from './components/Lesson/Lesson';
import PlaylistPage from './pages/PlaylistPage';

import {isValidCoursePath, isValidLessonPath, isValidReadmePath} from './contexts';

const getCoursePage = ({params}, callback) => {
  // Construct path explicitly instead of relying on location.pathname, which depends on originating link
  const path = `/${params.course}`;
  const returnPage = isValidCoursePath(path) ? PlaylistPage : PageNotFound;
  callback(null, returnPage);
};

const getLessonPage = ({params}, callback) => {
  // Construct path explicitly instead of relying on location.pathname, which depends on originating link
  const path = `/${params.course}/${params.lesson}/${params.file}`;
  const returnPage = isValidLessonPath(path) || isValidReadmePath(path) ? Lesson : PageNotFound;
  callback(null, returnPage);
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

const routes =
  <Route path="/" component={App} onEnter={appOnEnter} onChange={appOnChange}>
    <IndexRoute component={FrontPage}/>
    <Route path="/:course" getComponent={getCoursePage}/>
    <Route path="/:course/:lesson/:file" getComponent={getLessonPage}/>
    <Route path="*" component={PageNotFound}/>
  </Route>;

export default routes;
