import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './pages/App';
import Lesson from './components/Lesson';

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
  const params = nextState.params;
  const path = `${params.course}/${params.lesson}/${params.file}`;
  
  // This will put each md-file in a separate chunk, and the context in its own chunk as well.
  // See https://github.com/webpack/webpack/issues/118#issuecomment-28559053 for other options
  // including a way of putting the context in together with its parent.
  require(['bundle?name=[path][name]!frontAndContent!lessonSrc/' + path + '.md'], bundledResult => {
    bundledResult(result => {
      // How to pass props directly to component,
      // see https://stackoverflow.com/questions/33571734/with-getcomponent-how-to-pass-props/33578098#33578098
      cb(null, props => <Lesson {...props} lesson={result}/>);
    });
  });
};

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={getComponentFrontPage}/>
    <Route path="/:course" getComponent={getComponentPlaylist}/>
    <Route path="/:course/:lesson/:file" getComponent={getComponentLessonPage}/>
  </Route>
);
