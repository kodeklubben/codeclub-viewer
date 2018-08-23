import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import styles from './ContinueButton.scss';
import {getTranslator} from '../../selectors/translate';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getLessonPath, getLanguageAndIsReadme} from '../../resources/lessonFrontmatter';

const ContinueButton = ({path, t, lastLesson, isStudentMode}) => {
  const hasLastLesson = lastLesson !== '';
  const pathIsNotLastLesson = lastLesson !== path;
  const options = {
    'aria-label': t('frontpage.continueButton'),
    className: styles.container,
    bsStyle: isStudentMode ? 'language-student' : 'language-teacher'
  };
  return hasLastLesson && pathIsNotLastLesson ?
    <LinkContainer active={false} to={lastLesson}>
      <Button {...options}>
        <Glyphicon glyph={'arrow-right'}/>
        <span className={styles.textMargin}>{t('frontpage.continueButton')}</span>
      </Button>
    </LinkContainer>
    : null;
};

ContinueButton.propTypes = {
  // ownProps
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
  const path = isLesson ? getLessonPath(course, lesson, language, isReadme) : null;
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
