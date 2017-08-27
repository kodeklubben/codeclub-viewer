import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import {getTranslator} from '../../selectors/translate';
import {getReadmepathFromLessonpath} from '../../util';
import InstructionButton from './InstructionButton';

const LessonButton = ({buttonPath, t}) => {
  const buttonText= t('lessons.tolesson');
  const bsSize = 'small';
  const className = styles.buttonMargin;
  return <InstructionButton {...{className, buttonPath, buttonText, bsSize}}/>;
};

LessonButton.propTypes = {
  // mapStateToProps
  buttonPath: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  buttonPath: getReadmepathFromLessonpath(state.lessons, '/' + path)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonButton));
