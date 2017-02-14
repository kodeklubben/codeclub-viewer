import React from 'react';
import Lesson from './components/Lesson/Lesson';
import getRouteObject from './routeObject';
import store from './store';
//import getRouteObject404 from './routeObject';

function validPathTest(course, lesson, file){
  const state = store.getState().lessons; 

  if(!lesson){
    for(var key in state){
      if(course == state[key]['course']){
        return true;
      }
    }
    return false;
  }else{
    for(var key in state){
      if('/' + course + '/' + lesson + '/' + file == state[key]['path']){
        return true;
      }
    }
    return false;
  }
}

function pathTest(nextState, replace, callback){
  const params = nextState.params;
  const pathCorrect = validPathTest(params.course, params.lesson, params.file);

  if(!pathCorrect){
    replace('/PageNotFound');
  }
  callback();
}

const getComponentFrontPage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/FrontPage').FrontPageContainer);
  }, 'FrontPageContainer');
};

const getComponentPlaylist = (nextState, cb) => {
  const params = nextState.params;
  //const pathCorrect = validPathTest(params.course, null);
  console.log('Riktig path.');
  require.ensure([], (require) => {
    cb(null, require('./pages/PlaylistPage').PlaylistPageContainer);
  }, 'PlaylistPageContainer');
};

const getComponentLessonPage = (nextState, cb) => {
  const params = nextState.params;
  const path = `${params.course}/${params.lesson}/${params.file}`;
  //const pathCorrect = validPathTest(params.course, path);

  const bundledLessonContext = require.context('bundle?name=[path][name]!frontAndContent!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!index\.md$)[^\/]*\.md/);
  const bundle = bundledLessonContext('./' + path + '.md');
  bundle(result => {
    // How to pass props directly to component,
    // see https://stackoverflow.com/questions/33571734/with-getcomponent-how-to-pass-props/33578098#33578098
    cb(null, props => <Lesson {...props} lesson={result}/>);
  });

  // The following code was an attempt to make it look more like routes-static.js,
  // but alas it won't split the code into separate chunks / js-files per oppgave:
  //
  // require.ensure([], require => {
  //   const lessonContext = require.context('frontAndContent!lessonSrc/', true,
  //     /^\.\/[^\/]*\/[^\/]*\/(?!index\.md$|README\.md$)[^\/]*\.md/);
  //   const result = lessonContext('./' + path + '.md');
  //   // How to pass props directly to component,
  //   // see https://stackoverflow.com/questions/33571734/with-getcomponent-how-to-pass-props/33578098#33578098
  //   cb(null, props => <Lesson {...props} lesson={result}/>);
  // });
};

/*const getComponentLessonInstructionPage = (nextState, cb) => {
  const params = nextState.params;
  const path = `${params.course}/${params.lesson}/${params.file}`;

  const bundledLessonInstructionContext = require.context('bundle?name=[path][name]!frontAndContent!lessonSrc/', true,
    /^\.\/[^\/]*\/[^\/]*\/README\.md$/);
  const bundle = bundledLessonInstructionContext('./' + path + '.md');
  bundle(result => {
    cb(null, props => <Lesson {...props} lesson={result}/>);
  });

};*/

const getComponent404Page = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/PageNotFound').NotFoundContainer);
  }, 'NotFoundContainer');
};

const routes = getRouteObject(getComponentFrontPage, getComponentPlaylist,
  getComponentLessonPage, getComponent404Page, pathTest);
export default routes;

//export const routes404 = getRouteObject404(getComponentFrontPage, getComponent404Page);
//export const routes404;
