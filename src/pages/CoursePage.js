import React from 'react';
import {Grid, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/CoursePage/LessonList';

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
      <Grid container justify='center' spacing={2}>
        <Grid item xs={12} sm={3}>
          <LessonFilter/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container justify='center' spacing={2}>
            <LessonList/>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoursePage;
