import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LessonButton.scss';
import {getTranslator} from '../../selectors/translate';
import {getReadmepathFromLessonpath} from '../../contextUtils';
import InstructionButton from '../InstructionButton';

const LessonButton = ({buttonPath, t}) => {
  const buttonText= t('lessons.tolesson');
  const bsSize = 'small';
  const className = styles.container;
  return <InstructionButton {...{className, buttonPath, buttonText, bsSize}}/>;
};

LessonButton.propTypes = {
  // mapStateToProps
  buttonPath: PropTypes.string,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  buttonPath: getReadmepathFromLessonpath(path)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonButton));
