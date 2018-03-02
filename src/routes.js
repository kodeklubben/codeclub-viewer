import React from 'react';
import Lesson from './components/Lesson/Lesson';
import getRouteObject from './routeObject';


// const getComponentFrontPage = (nextState, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./pages/FrontPage').default);
//   }, 'FrontPage');
// };
//
// const getComponentPageNotFound = (nextState, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./pages/PageNotFound').default);
//   }, 'PageNotFound');
// };
//
// const getComponentPlaylist = (nextState, cb) => {
//   require.ensure([], (require) => {
//     cb(null, require('./pages/PlaylistPage').default);
//   }, 'PlaylistPage');
// };

const getComponentLessonPage = (nextState, cb) => {
  const params = nextState.params;
  const path = `${params.course}/${params.lesson}/${params.file}`;

  const bundledLessonContext = require.context('bundleLessons!lessonSrc/', true,
    /^\.\/[^/]*\/[^/]*\/(?!index\.md$)[^/]*\.md/);
  const bundle = bundledLessonContext('./' + path + '.md');
  bundle(result => {
    // How to pass props directly to component,
    // see https://stackoverflow.com/questions/33571734/with-getcomponent-how-to-pass-props/33578098#33578098
    cb(null, props => <Lesson {...props} path={path} lesson={result}/>);
  });

  // The following code was an attempt to make it look more like routes-static.js,
  // but alas it won't split the code into separate chunks / js-files per lesson:
  //
  // require.ensure([], require => {
  //   const lessonContext = require.context('lessonSrc/', true,
  //     /^\.\/[^\/]*\/[^\/]*\/(?!index\.md$|README\.md$)[^\/]*\.md/);
  //   const result = lessonContext('./' + path + '.md');
  //   // How to pass props directly to component,
  //   // see https://stackoverflow.com/questions/33571734/with-getcomponent-how-to-pass-props/33578098#33578098
  //   cb(null, props => <Lesson {...props} lesson={result}/>);
  // });
};



const routes = getRouteObject(getComponentLessonPage);
export default routes;
