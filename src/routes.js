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

const routes =
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage}/>
    <Route path="/:course" getComponent={getCoursePage}/>
    <Route path="/:course/:lesson/:file" getComponent={getLessonPage}/>
    <Route path="*" component={PageNotFound}/>
  </Route>;

export default routes;
