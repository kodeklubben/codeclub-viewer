import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Collapse, List, ListItem, ListItemIcon , ListItemText} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/Create';
import SchoolIcon from '@material-ui/icons/School';
import {setModeStudent, setModeTeacher} from '../../reducers/mode';
import {getTranslator} from '../../selectors/translate';

const ModeList = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const isStudentMode = useSelector(state => state.isStudentMode);
  const t = useSelector(state => getTranslator(state));

  const dispatch = useDispatch();
  const handleSelect = () => {
    isStudentMode ? dispatch(setModeTeacher()) : dispatch(setModeStudent());
    handleOpen();
  };

  return (
    <React.Fragment>
      <ListItem button divider={open} onClick={handleOpen}>
        <ListItemIcon>
          {isStudentMode ? <CreateIcon/> : <SchoolIcon/>}
        </ListItemIcon>
        <ListItemText primary={isStudentMode ? t('general.student') : t('general.teacher')}/>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List disablePadding>
          <ListItem button onClick={handleSelect}>
            <ListItemIcon>
              {isStudentMode ? <SchoolIcon/> : <CreateIcon/>}
            </ListItemIcon>
            <ListItemText primary={isStudentMode ? t('general.teacher') : t('general.student')}/>
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default ModeList;
