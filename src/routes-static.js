//import React from 'react';
//import Lesson from './components/Lesson/Lesson';
import getRouteObject from './routeObject';

// const getComponentLessonPage = (nextState, cb) => {
//   const params = nextState.params;
//   const path = `${params.course}/${params.lesson}/${params.file}`;
//
//   const lessonContext = require.context('lessonSrc/', true,
//     /^\.\/[^/]*\/[^/]*\/(?!index\.md$)[^/]*\.md/);
//   // console.log('SERVER: routes lessonContext.keys():');
//   // console.log(lessonContext.keys());
//   const result = lessonContext('./' + path + '.md');
//   cb(null, props => <Lesson {...props} path={path} lesson={result}/>);
// };


const routes = getRouteObject();
export default routes;
