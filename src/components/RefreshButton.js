import React from 'react';
import {Button} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';
import {makeStyles} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles(theme => ({
  root:{
    position: 'fixed',
    opacity: 1,
    borderRadius: 0,
    backgroundColor: red[400],
    borderColor: red[400],
    boxShadow: 'none',
    zIndex: 9,
    '&:hover': {
      backgroundColor: red[600],
    },
    '&:active': {
      backgroundColor: red[700],
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}));

const RefreshButton = () => {
  const classes = useStyles();

  const handleClick = event => {
    event.preventDefault();
    applyUpdate().then(() => window.location.reload());
  };

  return (
    <Button
      classes={{ root: classes.root }}
      fullWidth
      startIcon={<RefreshIcon color='primary'/>}
      color='inherit'
      variant='contained'
      size='large'
      onClick={handleClick}
    >
      REFRESH
    </Button>
  );
};

export default RefreshButton;
