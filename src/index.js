import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import {setAllCourses, setFilter} from './action_creators';
import routes from './routes';
import {getCourses, getTags} from './util';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!README\.md$)[^\/]*\.md/);
const allCourses = getCourses(lessonContext, iconContext);

const store = createStore(reducer);
store.dispatch(setAllCourses(allCourses));
store.dispatch(setFilter(getTags(lessonContext)));

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('app')
);
