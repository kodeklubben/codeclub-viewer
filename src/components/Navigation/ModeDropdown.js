import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ModeDropdown.scss';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';

const modes = ['student', 'teacher'];
const ModeDropdown = ({t, setModeStudent, setModeTeacher, mode}) => {
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

ModeDropdown.propTypes = {
  // ownProps
  mode: PropTypes.oneOf(modes).isRequired,

  //mapStateToProps
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setModeStudent: PropTypes.func.isRequired,
  setModeTeacher: PropTypes.func.isRequired
};

export default (withStyles(styles)(ModeDropdown));
