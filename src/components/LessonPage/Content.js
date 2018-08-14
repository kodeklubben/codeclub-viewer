import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Content.scss';
import {processContent} from '../../utils/processContent';
import {getLessonContent} from '../../resources/lessonContent';

const createMarkup = (lessonContent, isHydrated) => {
  return ({__html: processContent(lessonContent, styles, isHydrated)});
};

const Content = ({course, lesson, language, isReadme, isHydrated}) => {
  const lessonContent = getLessonContent(course, lesson, language, isReadme);
  return <Typography component='div' dangerouslySetInnerHTML={createMarkup(lessonContent, isHydrated)}/>;
};
Content.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  isHydrated: PropTypes.bool.isRequired, // require isHydrated as a prop to force rerender when it changes
};

const mapStateToProps = (state) => ({
  isHydrated: state.hydration,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(Content));
