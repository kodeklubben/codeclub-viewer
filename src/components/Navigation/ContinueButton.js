import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getLessonFrontmatter, getLanguageAndIsReadme} from '../../resources/lessonFrontmatter';

const ContinueButton = ({path, t, lastLesson, isStudentMode}) => {
  const hasLastLesson = lastLesson !== '';
  const pathIsNotLastLesson = lastLesson !== path;
  const options = {
    'aria-label': t('frontpage.continueButton'),
    bsStyle: isStudentMode ? 'language-student' : 'language-teacher'
  };
  return hasLastLesson && pathIsNotLastLesson ?
    <LinkContainer active={false} to={lastLesson}>
      <Button {...options}>
        <Glyphicon glyph={'arrow-right'}/>
        <span>{t('frontpage.continueButton')}</span>
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
)(ContinueButton);
