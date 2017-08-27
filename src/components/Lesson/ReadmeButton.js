import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import {getTranslator} from '../../selectors/translate';
import InstructionButton from './InstructionButton';

const ReadmeButton = ({buttonPath, t}) => {
  const buttonText= t('lessons.toteacherinstruction');
  const bsSize = 'small';
  const className = styles.buttonMargin;
  return <InstructionButton {...{className, buttonPath, buttonText, bsSize}}/>;
};

ReadmeButton.propTypes = {
  // mapStateToProps
  buttonPath: PropTypes.string,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  buttonPath: (state.lessons['./' + path + '.md'] || {}).readmePath,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(ReadmeButton));
