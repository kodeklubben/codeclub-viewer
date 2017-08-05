import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ModeButton.scss';
import Button from 'react-bootstrap/lib/Button';
import {setModeStudent, setModeTeacher} from '../../action_creators';

const modes = ['student', 'teacher'];

const ModeButton = ({t, mode}) => {
  const texts = {'student': t('general.student'), 'teacher': t('general.teacher')};
  const setMode = (mode) => {
    mode === 'student' ? setModeStudent() : setModeTeacher();
  };
  return <div className={styles.gadgetContainer}>
    <Button bsStyle={mode} onClick={setMode}>
      {t('navbar.mode') + ': ' + texts[mode]}
    </Button>
  </div>;
};

ModeButton.propTypes = {
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  mode: PropTypes.oneOf(modes).isRequired,
  t: PropTypes.func
};

const mapDispatchToProps = {
  setModeStudent,
  setModeTeacher
};

export default connect(
  mapDispatchToProps
)(withStyles(styles)(ModeButton));
