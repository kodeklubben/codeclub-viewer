import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Content.scss';
import {processContent} from '../../utils/processContent';
import {getLessonContent} from '../../resources/lessonContent';

const createMarkup = (lessonContent) => {
  return ({__html: processContent(lessonContent, styles)});
};

// const Loading = () => <div>Loading...</div>;
//
// const getLesson = (path) => Loadable({
//   loader: () => import('./Content'),
//   loading: Loading,
// });

//console.log('lessonContext.keys:', lessonContext.keys());

const Content = ({course, lesson, language, isReadme}) => {
  const lessonContent = getLessonContent(course, lesson, language, isReadme);
  return <div dangerouslySetInnerHTML={createMarkup(lessonContent)}/>;
};
Content.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Content);
