import React from 'react';
import Lesson from './components/Lesson/Lesson';
import getRouteObject from './routeObject';


const getComponentPlaylist = (nextState, cb) => {
  cb(null, require('./pages/PlaylistPage').PlaylistPageContainer);
};

const getComponentFrontPage = (nextState, cb) => {
  cb(null, require('./pages/FrontPage').FrontPageContainer);
};

const getComponentNotFound = (nextState, cb) => {
  cb(null, require('./pages/PageNotFound').NotFoundContainer);
};

const getComponentLessonPage = (nextState, cb) => {
  const params = nextState.params;
  const path = params.file ? `${params.course}/${params.lesson}/${params.file}`
    : nextState.location.pathname;

  const lessonContext = require.context('frontAndContent!lessonSrc/', true,
    /^\.\/[^\/]*\/[^\/]*\/(?!index\.md$)[^\/]*\.md/);
  // console.log('SERVER: routes lessonContext.keys():');
  // console.log(lessonContext.keys());
  const result = lessonContext('./' + path + '.md');
  cb(null, props => <Lesson {...props} path={path} lesson={result}/>);
};


const routes = getRouteObject(
  getComponentFrontPage, getComponentPlaylist, getComponentLessonPage, getComponentNotFound);
export default routes;
