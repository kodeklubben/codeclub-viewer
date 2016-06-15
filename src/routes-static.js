import React from 'react';
import Lesson from './components/Lesson';
import getRouteObject from './routeObject';


const getComponentPlaylist = (nextState, cb) => {
  cb(null, require('./pages/PlaylistPage').default);
};

const getComponentFrontPage = (nextState, cb) => {
  cb(null, require('./pages/FrontPage').default);
};

const getComponentLessonPage = (nextState, cb) => {
  const params = nextState.params;
  const path = `${params.course}/${params.lesson}/${params.file}`;

  const lessonContext = require.context('frontAndContent!lessonSrc/', true,
    /^\.\/[^\/]*\/[^\/]*\/(?!index\.md$|README\.md$)[^\/]*\.md/);
  // console.log('SERVER: routes lessonContext.keys():');
  // console.log(lessonContext.keys());
  const result = lessonContext('./' + path + '.md');
  cb(null, props => <Lesson {...props} lesson={result}/>);
};


const routes = getRouteObject(getComponentFrontPage, getComponentPlaylist, getComponentLessonPage);
export default routes;
