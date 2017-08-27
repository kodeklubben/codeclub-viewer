import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getTranslator} from '../../selectors/translate';
import {getReadmepathFromLessonpath} from '../../util';
import InstructionButton from './InstructionButton';

const LessonButton = ({path, lessons, t}) => {
  const lessonPath = '/' + path;
  const buttonPath = getReadmepathFromLessonpath(lessons, lessonPath);
  const buttonText= t('lessons.tolesson');
  const bsStyle = 'guide';
  const bsSize = 'small';
  return <InstructionButton {...{buttonPath, buttonText, bsStyle, bsSize}}/>;
};

LessonButton.propTypes = {
  // ownProps
  path: PropTypes.string.isRequired,

  // mapStateToProps
  lessons: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  lessons: state.lessons,
});

export default connect(
  mapStateToProps
)(LessonButton);
