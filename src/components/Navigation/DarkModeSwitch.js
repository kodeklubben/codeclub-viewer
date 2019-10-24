import React from 'react';
import {ListItemSecondaryAction, Switch, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const DarkModeSwitch = () => {
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
          onChange={() => console.log('Change to dark mode')}
          inputProps={{'aria-labelledby': 'dark-mode-switch'}}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DarkModeSwitch;
