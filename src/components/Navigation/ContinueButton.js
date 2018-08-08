import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Link from 'react-router/lib/Link';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {getTranslator} from '../../selectors/translate';
import {getLessonFrontmatter, getLanguageAndIsReadme} from '../../resources/lessonFrontmatter';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  text: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

const ContinueButton = ({classes, path, t, lastLesson, isStudentMode}) => {
  const hasLastLesson = lastLesson !== '';
  const pathIsNotLastLesson = lastLesson !== path;
  const options = {
    'aria-label': t('frontpage.continueButton'),
    className: classes.button,
    to: lastLesson,
    component: Link,
    size: 'small',
    variant: 'outlined',
  };
  return hasLastLesson && pathIsNotLastLesson ?
    <Button {...options}>
      <ArrowForwardIcon/>
      <span className={classes.text}>{t('frontpage.continueButton')}</span>
    </Button>
    : null;
};

ContinueButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string,
  lesson: PropTypes.string,
  file: PropTypes.string,

  // mapStateToProps
  path: PropTypes.string,
  t: PropTypes.func.isRequired,
  lastLesson: PropTypes.string.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course, lesson, file}) => {
  const isLesson = !!lesson;
  const {language, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const {path} = isLesson ? getLessonFrontmatter(course, lesson, language, isReadme) || {} : {};
  return {
    path,
    t: getTranslator(state),
    lastLesson: state.lastLesson,
    isStudentMode: state.isStudentMode,
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(ContinueButton));
