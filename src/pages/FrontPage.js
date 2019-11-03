import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LessonFilter from '../components/Filter/LessonFilter';
import {getFilteredCourses} from '../selectors/course';
import {getCoursesWithPlaylists} from '../resources/playlists';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import CourseList from '../components/FrontPage/CourseList';
import ExternalCourseList from '../components/FrontPage/ExternalCourseList';

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
      <Grid container justify='center' spacing={2}>
        <Grid item xs={12} sm={3}>
          <LessonFilter/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container justify='center' spacing={2}>
            {courses.map(course => <CourseList key={course} {...{course}}/>)}
          </Grid>
          <Grid container justify='center' spacing={2}>
            <ExternalCourseList/>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FrontPage;
