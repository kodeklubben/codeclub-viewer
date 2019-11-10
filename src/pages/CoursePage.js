import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Grid, Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getFilteredCourses, getFilteredExternalCoursesWithLanguages} from '../selectors/course';
import {getTranslator} from '../selectors/translate';
import {getFilteredLevelsInCourse} from '../selectors/lesson';
import {getCoursesWithPlaylists} from '../resources/playlists';
import {getCourseTitle} from '../resources/courseFrontmatter';
import {getCourseIntroText} from '../resources/courseContent';
import LessonFilter from '../components/Filter/LessonFilter';
import ClearFilterButton from '../components/Filter/ClearFilterButton';
import LessonList from '../components/CoursePage/LessonList';
import Head from '../components/Head';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  list: {
    flexGrow: 1,
  },
}));

const CoursePage = ({params}) => {
  const classes = useStyles();

  const {course} = params;

  const t = useSelector(state => getTranslator(state));
  const courses = useSelector(state => state.showPlaylists ? getCoursesWithPlaylists() : getFilteredCourses(state));
  const externalCourses = useSelector(state => 
    state.showPlaylists ? [] : getFilteredExternalCoursesWithLanguages(state)
  );
  const levels = useSelector(state => getFilteredLevelsInCourse(state, course));
  const courseTitle = useSelector(state => getCourseTitle(course, state.language));
  const language = useSelector(state => state.language);

  const noLessons = courses.length + externalCourses.length !== 0;

  const lessonLists = levels.map(level => <LessonList key={level} {...{course, level}} />);

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Head title={courseTitle} description={getCourseIntroText(course, language)}/>
      <Grid container spacing={4}>
        <Grid item>
          <Grid container direction='column' alignItems='center'>
            <LessonFilter/>
            <ClearFilterButton/>
          </Grid>
        </Grid>
        <Grid item className={classes.list}>
          {noLessons ? null : <Typography variant='h4'>{t('coursepage.nomatchinglessons')}</Typography>}
          {lessonLists}
        </Grid>
      </Grid>
    </Container>
  );
};

CoursePage.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  }).isRequired,
};

export default CoursePage;
