import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './pages/App';

export function getRouteObject(
  getComponentFrontPage,
  getComponentPlaylist,
  getComponentLessonPage,
  getComponent404Page
) {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getComponentFrontPage}/>
      <Route path="/:course" getComponent={getComponentPlaylist}/>
      <Route path="/:course/:lesson/:file" getComponent={getComponentLessonPage}/>
      <Route path="*" getComponent={getComponent404Page}/>
    </Route>
  );
}

export function getRouteObject404(
  getComponentFrontPage,
  getComponent404Page
) {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getComponentFrontPage}/>
      <Route path="*" getComponent={getComponent404Page}/>
    </Route>
  );
}
