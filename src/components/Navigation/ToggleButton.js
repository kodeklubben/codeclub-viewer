import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ToggleButton.scss';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';

const modes = ['student', 'teacher'];

const ToggleButton = ({t, setModeStudent, setModeTeacher, mode}) => {
  const texts = {'student': t('general.student'), 'teacher': t('general.teacher')};
  const setMode = mode => mode === 'student' ? setModeStudent() : setModeTeacher();
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='mode-dropdown'
                    noCaret
                    pullRight
                    bsStyle={mode}
                    title={t('navbar.mode') + ': ' + texts[mode]}
                    onSelect={setMode}>
      {
        modes.map(k =>
          <MenuItem key={k} eventKey={k} active={mode === k}>{texts[k]}</MenuItem>
        )
      }
    </DropdownButton>
  </div>;
};

ToggleButton.propTypes = {
  setModeStudent: PropTypes.func,
  setModeTeacher: PropTypes.func,
  mode: PropTypes.oneOf(modes).isRequired,
  t: PropTypes.func
};

export default withStyles(styles)(ToggleButton);
