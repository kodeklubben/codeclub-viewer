import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ReadmeButton.scss';
import {getTranslator} from '../../selectors/translate';
import InstructionButton from '../InstructionButton';
import {getLessonData} from '../../util';

const ReadmeButton = ({buttonPath, t}) => {
  const buttonText= t('lessons.toteacherinstruction');
  const bsSize = 'small';
  const className = styles.container;
  return <InstructionButton {...{className, buttonPath, buttonText, bsSize}}/>;
};

ReadmeButton.propTypes = {
  // mapStateToProps
  buttonPath: PropTypes.string,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  buttonPath: (getLessonData()[path] || {}).readmePath,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(ReadmeButton));
