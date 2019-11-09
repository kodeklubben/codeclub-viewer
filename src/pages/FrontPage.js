import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getFilteredCourses, getFilteredExternalCoursesWithLanguages} from '../selectors/course';
import {getTranslator} from '../selectors/translate';
import {getCoursesWithPlaylists} from '../resources/playlists';
import LessonFilter from '../components/Filter/LessonFilter';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import CourseItem from '../components/FrontPage/CourseItem';
import ExternalCourseItem from '../components/FrontPage/ExternalCourseItem';
import ClearFilterButton from '../components/Filter/ClearFilterButton';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  externalText: {
    marginTop: theme.spacing(5),
  },
}));

const FrontPage = () => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const isStudentMode = useSelector(state => state.isStudentMode);
  const courses = useSelector(state => state.showPlaylists ? getCoursesWithPlaylists() : getFilteredCourses(state));
  const externalCourses = useSelector(state => state.showPlaylists ? [] : getFilteredExternalCoursesWithLanguages(state));

  const noLessons = courses.length + externalCourses.length !== 0;

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Grid container justify='center'>
        {isStudentMode ? null : <TeacherInfobox/>}
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Grid container direction='column' alignItems='center'>
            <LessonFilter/>
            <ClearFilterButton/>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          {noLessons ? null : <Typography variant='h3'>{t('coursepage.nomatchinglessons')}</Typography>}
          {courses.length > 0 ?
            <Typography gutterBottom variant='h3'>{t('frontpage.courses')}</Typography>
          : null}
          <Grid container justify='center' spacing={2}>
            {courses.map(course => (
              <Grid item key={course}>
                <CourseItem {...{course}}/>
              </Grid>
            ))}
          </Grid>
          {externalCourses.length > 0 ?
            <Typography className={classes.externalText} gutterBottom variant='h3'>
              {t('frontpage.otherwebsitecourses')}
            </Typography>
          : null}
          <Grid container justify='center' spacing={2}>
            {externalCourses.map(({course, language}) => (
              <ExternalCourseItem key={`${course}_${language}`} {...{course, language}}/>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FrontPage;
