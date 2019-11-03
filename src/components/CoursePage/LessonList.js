import React from 'react';
import {Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 300,
    overflowX: 'hidden',
  },
}));

const LessonList = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center'>
      <Paper className={classes.paper}>
        Test
      </Paper>
    </Grid>
  );
};

export default LessonList;
