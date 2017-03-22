import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './pages/App';

export default function getRouteObject(
  getComponentFrontPage,
  getComponentPlaylist,
  getComponentLessonPage
) {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getComponentFrontPage}/>
      <Route path="/:course" getComponent={getComponentPlaylist}/>
      <Route path="/:course/:lesson/README" getComponent={getComponentLessonPage}/>
      <Route path="/:course/:lesson/:file" getComponent={getComponentLessonPage}/>
    </Route>
  );
}
