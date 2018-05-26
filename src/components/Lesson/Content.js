import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Content.scss';
import processContent from '../../processContent';
//import {lessonContext, readmeContext} from '../../contexts';

// lessonSrc/*/*/*.md, the regexp should be the same as in context.js
const lessonContext =
  require.context('frontmatter!lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/][^.]*[.]md$/);

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

const Content = ({path}) => {
  const lessonContent = lessonContext('./' + path + '.md');
  return <div dangerouslySetInnerHTML={createMarkup(lessonContent)}/>;
};
Content.propTypes = {
  path: PropTypes.string, // of the form 'scratch/astrokatt/astrokatt'
};

export default withStyles(styles)(Content);
