import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import {getTranslator} from '../../selectors/translate';
import {getReadmepathFromLessonpath} from '../../util';
import InstructionButton from './InstructionButton';

const LessonButton = ({path, lessons, t}) => {
  const lessonPath = '/' + path;
  const buttonPath = getReadmepathFromLessonpath(lessons, lessonPath);
  const buttonText= t('lessons.tolesson');
  const bsSize = 'small';
  const className = styles.buttonMargin;
  return <InstructionButton {...{className, buttonPath, buttonText, bsSize}}/>;
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
)(withStyles(styles)(LessonButton));
