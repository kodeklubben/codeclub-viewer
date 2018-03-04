//import React from 'react';
//import Lesson from './components/Lesson/Lesson';
import getRouteObject from './routeObject';

// const getComponentLessonPage = (nextState, cb) => {
//   const params = nextState.params;
//   const path = `${params.course}/${params.lesson}/${params.file}`;
//
//   const bundledLessonContext = require.context('bundleLessons!lessonSrc/', true,
//     /^\.\/[^/]*\/[^/]*\/(?!index\.md$)[^/]*\.md/);
//   const bundle = bundledLessonContext('./' + path + '.md');
//   bundle(result => {
//     // How to pass props directly to component,
//     // see https://stackoverflow.com/questions/33571734/with-getcomponent-how-to-pass-props/33578098#33578098
//     cb(null, props => <Lesson {...props} path={path} lesson={result}/>);
//   });
//
// };
//


const routes = getRouteObject();
export default routes;
