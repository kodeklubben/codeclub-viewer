import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Container, Typography, Hidden} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getFilteredCourses, getFilteredExternalCoursesWithLanguages} from '../selectors/course';
import {getTranslator} from '../selectors/translate';
import {getCoursesWithPlaylists} from '../resources/playlists';
import LessonFilter from '../components/Filter/LessonFilter';
import CourseItem from '../components/FrontPage/CourseItem';
import ExternalCourseItem from '../components/FrontPage/ExternalCourseItem';
import CollapsibleLessonFilter from '../components/Filter/CollapsibleLessonFilter';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  externalText: {
    marginTop: theme.spacing(5),
  },
  fill: {
    flexGrow: 1,
  },
}));

const FrontPage = () => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const courses = useSelector(state => state.showPlaylists ? getCoursesWithPlaylists() : getFilteredCourses(state));
  const externalCourses = useSelector(state =>
    state.showPlaylists ? [] : getFilteredExternalCoursesWithLanguages(state)
  );

  const noLessons = courses.length + externalCourses.length !== 0;

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Hidden implementation='css' mdUp><CollapsibleLessonFilter /></Hidden>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Hidden implementation='css' smDown><LessonFilter/></Hidden>
        </Grid>
        <Grid item xs={12} md={9}>
          {noLessons ? null : <Typography variant='h4'>{t('coursepage.nomatchinglessons')}</Typography>}
          <Grid container spacing={4}>
            {courses.map(course => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={course}>
                <CourseItem {...{course}}/>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={4}>
            {externalCourses.map(({course, language}) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={`${course}_${language}`}>
                <ExternalCourseItem {...{course, language}}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FrontPage;
