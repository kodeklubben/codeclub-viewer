import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LessonFilter from '../components/Filter/LessonFilter';
import {getFilteredCourses} from '../selectors/course';
import {getCoursesWithPlaylists} from '../resources/playlists';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import CourseItem from '../components/FrontPage/CourseItem';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const FrontPage = () => {
  const classes = useStyles();

  const isStudentMode = useSelector(state => state.isStudentMode);
  const courses = useSelector(state => state.showPlaylists ? getCoursesWithPlaylists() : getFilteredCourses(state));

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Grid container justify='center'>
        {isStudentMode ? null : <TeacherInfobox/>}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <LessonFilter/>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Grid container justify='center' spacing={3}>
            {courses.map(course => <CourseItem key={course} {...{course}}/>)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FrontPage;
