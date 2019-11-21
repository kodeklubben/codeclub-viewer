import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ListItemSecondaryAction, Switch, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import {makeStyles} from '@material-ui/core/styles';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';
import {getTranslator} from '../../selectors/translate';

const useStyles = makeStyles(theme => ({
  space: {
    marginRight: theme.spacing(2.5),
  },
}));

const DyslexiaSwitch = () => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const showDyslexicFont = useSelector(state => state.showDyslexicFont);

  const dispatch = useDispatch();
  return (
    <ListItem>
      <ListItemIcon>
        <AccessibilityIcon color='primary'/>
      </ListItemIcon>
      <ListItemText className={classes.space} id='dyxlexic-font-switch' primary={t('navbar.dyslexia')}/>
      <ListItemSecondaryAction>
        <Switch
          color='primary'
          edge='end'
          checked={showDyslexicFont}
          onChange={() => dispatch(setShowDyslexicFont(!showDyslexicFont))}
          inputProps={{'aria-labelledby': 'dyxlexic-font-switch'}}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DyslexiaSwitch;
