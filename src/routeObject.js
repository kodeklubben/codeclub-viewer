import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './pages/App';

export default function getRouteObject(
  getComponentFrontPage,
  getComponentPlaylist,
  getComponentLessonPage,
  getComponent404Page,
  pathTest
) {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getComponentFrontPage}/>
      <Route path="/PageNotFound" getComponent={getComponent404Page}/>
      <Route path="/:course" getComponent={getComponentPlaylist} onEnter={pathTest}/>
      <Route path="/:course/:lesson/:file" getComponent={getComponentLessonPage} onEnter={pathTest}/>
      <Route path="*" getComponent={getComponent404Page}/>
    </Route>
  );
}
