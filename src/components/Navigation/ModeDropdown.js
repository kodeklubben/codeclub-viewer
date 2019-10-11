import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ModeDropdown.scss';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';
import {setModeStudent, setModeTeacher} from '../../reducers/mode';

const ModeDropdown = () => {
  useStyles(styles);

  const {isStudentMode, t} = useSelector(state => ({
    isStudentMode: state.isStudentMode,
    t: getTranslator(state),
  }));

  const dispatch = useDispatch();
  const handleSelect = eventKey => eventKey === 'teacher' ? dispatch(setModeTeacher()) : dispatch(setModeStudent());
  
  const modes = ['student', 'teacher'];
  const texts = {'student': t('general.student'), 'teacher': t('general.teacher')};
  const mode = isStudentMode ? modes[0] : modes[1];
  const bsStyle = 'language-' + mode;
  const title = (
    <div>
      <Glyphicon className={styles.icon} glyph={isStudentMode ? 'pencil' : 'education'}/>
      <span>
        <span className={styles.onlyMode}>{t('navbar.mode') + ': '}</span>
        {texts[mode]}
      </span>
    </div>
  );
  return (
    <div className={styles.gadgetContainer}>
      <DropdownButton id='mode-dropdown' noCaret pullRight onSelect={handleSelect} {...{bsStyle, title}}>
        {modes.map(key =>
          <MenuItem {...{key}} eventKey={key} active={mode === key}>
            <Glyphicon className={styles.icon} glyph={key === 'student' ? 'pencil' : 'education'}/>
            {texts[key]}
          </MenuItem>)
        }
      </DropdownButton>
    </div>
  );
};

export default ModeDropdown;
