import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ModeButton.scss';
import Button from 'react-bootstrap/lib/Button';
import {setModeStudent, setModeTeacher} from '../../action_creators';

const ModeButton = ({t, isStudentMode}) => {
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  const texts = isStudentMode ? t('general.student') : t('general.teacher');
  const setMode = isStudentMode ? setModeStudent() : setModeTeacher();
  return <div className={styles.gadgetContainer}>
    <Button bsStyle={bsStyle} onClick={setMode}>
      {t('navbar.mode') + ': ' + texts}
    </Button>
  </div>;
};

ModeButton.propTypes = {
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  t: PropTypes.func,
  isStudentMode: PropTypes.bool
};

const mapDispatchToProps = {
  setModeStudent,
  setModeTeacher
};

export default connect(
  mapDispatchToProps
)(withStyles(styles)(ModeButton));
