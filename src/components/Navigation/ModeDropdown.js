import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ModeDropdown.scss';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';
import {setModeStudent, setModeTeacher} from '../../action_creators';

const ModeDropdown = ({t, setModeStudent, setModeTeacher, isStudentMode}) => {
  const modes = ['student', 'teacher'];
  const texts = {'student': t('general.student'), 'teacher': t('general.teacher')};
  const bsStyle = isStudentMode ? modes[0] : modes[1];
  const onSelect = () => {isStudentMode ? setModeTeacher() : setModeStudent();};
  const title = <div>
    <Glyphicon className={styles.icon} glyph={isStudentMode ? 'pencil' : 'education'}/>
    <span>
      <span className={styles.onlyMode}>{t('navbar.mode') + ': '}</span>
      {texts[bsStyle]}
    </span>
  </div>;
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='mode-dropdown' noCaret pullRight {...{bsStyle, onSelect, title}}>
      {modes.map(key =>
        <MenuItem {...{key}} eventKey={key} active={bsStyle === key}>
          {texts[key]}
          <Glyphicon className={styles.icon} glyph={key === 'student' ? 'pencil' : 'education'}/>
        </MenuItem>)
      }
    </DropdownButton>
  </div>;
};

ModeDropdown.propTypes = {
  //mapStateToProps
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setModeStudent: PropTypes.func.isRequired,
  setModeTeacher: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state)
});

const mapDispatchToProps = {
  setModeStudent,
  setModeTeacher
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ModeDropdown));
