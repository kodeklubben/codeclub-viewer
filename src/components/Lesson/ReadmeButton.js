import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import {getTranslator} from '../../selectors/translate';
import InstructionButton from './InstructionButton';

const ReadmeButton = ({path, lessons, t}) => {
  const contextPath = './' + path + '.md';
  const buttonPath = (lessons[contextPath] || {}).readmePath;
  const buttonText= t('lessons.toteacherinstruction');
  const bsSize = 'small';
  const className = styles.buttonMargin;
  return <InstructionButton {...{className, buttonPath, buttonText, bsSize}}/>;
};

ReadmeButton.propTypes = {
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
)(withStyles(styles)(ReadmeButton));
