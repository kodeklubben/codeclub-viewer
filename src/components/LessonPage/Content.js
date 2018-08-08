import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Content.scss';
import {processContent} from '../../utils/processContent';
import {getLessonContent} from '../../resources/lessonContent';

const createMarkup = (lessonContent, isHydrated) => {
  return ({__html: processContent(lessonContent, styles, isHydrated)});
};

// const Loading = () => <div>Loading...</div>;
//
// const getLesson = (path) => Loadable({
//   loader: () => import('./Content'),
//   loading: Loading,
// });

//console.log('lessonContext.keys:', lessonContext.keys());

const Content = ({course, lesson, language, isReadme, isHydrated}) => {
  const lessonContent = getLessonContent(course, lesson, language, isReadme);
  return <div dangerouslySetInnerHTML={createMarkup(lessonContent, isHydrated)}/>;
};
Content.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
  isHydrated: PropTypes.bool.isRequired, // require isHydrated as a prop to force rerender when it changes
};

export default withStyles(styles)(Content);
