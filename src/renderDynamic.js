/* eslint-env node */
/* global IS_HOT */

import React from 'react';
import {render, hydrate} from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import store, {updateStoreFromLocalStorage} from './store';
import {setHydrationComplete} from './reducers/hydration';
import App from './pages/App';
import FrontPage from './pages/FrontPage';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import PageNotFound from './pages/PageNotFound';
import {isValidCourse} from './resources/courses';
import {getLanguageAndIsReadme} from './resources/lessonFrontmatter';

const getCoursePage = ({match}) => {
  const {course} = match.params;
  return isValidCourse(match.params.course) ? <CoursePage {...{course}}/> : <PageNotFound/>;
};

const getLessonPage = ({match}) => {
  const {course, lesson, file} = match.params;
  const languageAndIsReadme =  getLanguageAndIsReadme(course, lesson, file);
  if (languageAndIsReadme) {
    const {language, isReadme} = languageAndIsReadme;
    return <LessonPage {...{course, lesson, language, isReadme}}/>;
  }
  else {
    return <PageNotFound/>;
  }
};

const renderDynamic = () => {
  const callback = () => {
    updateStoreFromLocalStorage();
    store.dispatch(setHydrationComplete());
  };

  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());
    return () => removeCss.forEach(dispose => dispose());
  };

  const renderFunc = IS_HOT ? render : hydrate;
  return renderFunc(
    <Provider {...{store}}>
      <StyleContext.Provider value={{insertCss}}>
        <Router>
          <App>
            <Switch>
              <Route exact path='/' component={FrontPage}/>
              <Route exact path='/:course' render={getCoursePage}/>
              <Route exact path='/:course/:lesson/:file' render={getLessonPage}/>
              <Route path='*' component={PageNotFound}/>
            </Switch>
          </App>
        </Router>
      </StyleContext.Provider>
    </Provider>,

    document.getElementById('app'),

    callback,
  );
};

export default renderDynamic;
