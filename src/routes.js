import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import FrontPage from './pages/FrontPage';
import PlaylistPage from './pages/PlaylistPage';
import LessonPage from './pages/LessonPage';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage}/>
    <Route path="/:course" component={PlaylistPage}/>
    <Route path="/:course/:lesson" component={LessonPage}/>
  </Route>
);
