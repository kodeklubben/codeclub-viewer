import React from 'react';
import {Grid, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LessonFilter from '../components/Filter/LessonFilter';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const CoursePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <LessonFilter/>
        </Grid>
        <Grid item xs={12} sm={10}>
          KURS
        </Grid>
      </Grid>
    </Container>
  );
};
export default CoursePage;
