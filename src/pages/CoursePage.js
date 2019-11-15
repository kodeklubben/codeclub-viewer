import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Grid, Container, Typography, Hidden} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../selectors/translate';
import {getShowFiltergroups} from '../selectors/playlist';
import {getFilteredLevelsInCourse} from '../selectors/lesson';
import {getCourseTitle} from '../resources/courseFrontmatter';
import {getCourseIntroText} from '../resources/courseContent';
import LessonFilter from '../components/Filter/LessonFilter';
import CollapsibleLessonFilter from '../components/Filter/CollapsibleLessonFilter';
import LessonList from '../components/CoursePage/LessonList';
import Head from '../components/Head';
import CourseInfo from '../components/CoursePage/CourseInfo';
import PlaylistNavigation from '../components/CoursePage/PlaylistNavigation';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  gridRoot: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
  },
}));

const CoursePage = ({params}) => {
  const classes = useStyles();

  const {course} = params;

  const t = useSelector(state => getTranslator(state));

  const levels = useSelector(state => getFilteredLevelsInCourse(state, course));
  const courseTitle = useSelector(state => getCourseTitle(course, state.language));
  const language = useSelector(state => state.language);
  const showPlaylists = useSelector(state => !getShowFiltergroups(state));

  const lessonLists = levels.map(level => <LessonList key={level} {...{course, level}} />);

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Head title={courseTitle} description={getCourseIntroText(course, language)}/>
      <Grid container classes={{ root: classes.gridRoot }} justify='center'>
        <CourseInfo {...{course}}/>
      </Grid>
      <Hidden implementation='css' mdUp><CollapsibleLessonFilter /></Hidden>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Hidden implementation='css' smDown><LessonFilter {...{course}}/></Hidden>
        </Grid>
        <Grid item xs={12} md={9}>
          {lessonLists.length ? null : <Typography variant='h4'>{t('coursepage.nomatchinglessons')}</Typography>}
          {showPlaylists ? <PlaylistNavigation {...{course}}/> : lessonLists}
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
