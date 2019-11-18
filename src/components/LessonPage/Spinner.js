import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto 10px',
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return <CircularProgress id='spinner' color='inherit' className={classes.root}/>;
};

export default Spinner;
