import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setShowDarkMode} from '../../reducers/showDarkMode';
import {ListItemSecondaryAction, Switch, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const DarkModeSwitch = () => {
  const showDarkMode = useSelector(state => state.showDarkMode);
  const dispatch = useDispatch();

  return (
    <ListItem>
      <ListItemIcon>
        <Brightness4Icon/>
      </ListItemIcon>
      <ListItemText id='dark-mode-switch' primary='Dark mode'/>
      <ListItemSecondaryAction>
        <Switch
          color='default'
          edge='end'
          checked={showDarkMode}
          onChange={() => dispatch(setShowDarkMode(!showDarkMode))}
          inputProps={{'aria-labelledby': 'dark-mode-switch'}}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DarkModeSwitch;
