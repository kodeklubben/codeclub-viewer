import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getTranslator} from '../../selectors/translate';
import {getReadmepathFromLessonpath} from '../../util';
import InstructionButton from './InstructionButton';

const LessonOrReadmeButton = ({path, lessons, t, isReadme, isStudentMode}) => {
  const lessonPath = '/' + path;
  const contextPath = './' + path + '.md';
  const buttonPath = isReadme ?
    getReadmepathFromLessonpath(lessons, lessonPath) : (lessons[contextPath] || {}).readmePath;
  const buttonText= isReadme ? t('lessons.tolesson') : t('lessons.toteacherinstruction');
  const bsStyle = 'guide';
  const bsSize = 'small';
  return isStudentMode && !isReadme ? null : <InstructionButton {...{buttonPath, buttonText, bsStyle, bsSize}}/>;
};

LessonOrReadmeButton.propTypes = {
  // ownProps
  path: PropTypes.string.isRequired,

  // mapStateToProps
  lessons: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isReadme: PropTypes.bool.isRequired,
  isStudentMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  lessons: state.lessons,
  isReadme: state.context.readmeContext.keys().indexOf('./' + path + '.md') !== -1,
  isStudentMode: state.isStudentMode
});

export default connect(
  mapStateToProps
)(LessonOrReadmeButton);
