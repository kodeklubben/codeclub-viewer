import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './pages/App';

const getComponentPlaylist = (nextState, cb) =>{
  require.ensure([], (require) =>{
    cb(null, require('./pages/PlaylistPage').default);
  }, 'PlaylistPage');
};

const getComponentFrontPage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/FrontPage').default);
  }, 'FrontPage');
};

const getComponentLessonPage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/LessonPage').default);
  }, 'LessonPage');
};

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={getComponentFrontPage}/>
    <Route path="/:course" getComponent={getComponentPlaylist}/>
    <Route path="/:course/:lesson" getComponent={getComponentLessonPage}/>
  </Route>
);
