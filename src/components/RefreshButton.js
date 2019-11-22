import React from 'react';
import {useSelector} from 'react-redux';
import {getTranslator} from '../selectors/translate';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[600],
    },
  },
}));

const RefreshButton = () => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  return (
    <Button id='app-update' variant='contained' fullWidth className={classes.root}>
      {t('general.refresh')}
    </Button>
  );
};

export default RefreshButton;
