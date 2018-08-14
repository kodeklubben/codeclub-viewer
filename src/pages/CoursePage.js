import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {getTranslator} from '../selectors/translate';
import {getShowFiltergroups} from '../selectors/playlist';
import {getFilteredLevelsInCourse} from '../selectors/lesson';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/CoursePage/LessonList';
import PlaylistNavigation from '../components/CoursePage/PlaylistNavigation';
import CourseInfo from '../components/CoursePage/CourseInfo';
import Head from '../components/Head';
import {getCourseTitle} from '../resources/courseFrontmatter';
import {getCourseIntroText} from '../resources/courseContent';

const styles = theme => ({
  topMargin: {
    marginTop: 0,
    [theme.breakpoints.up('sm')]: {
      marginTop: 72,
    },
  },
});

const CoursePage = ({classes, params, courseTitle, levels, t, showPlaylists, language}) => {
  const {course} = params;
  const lessonLists = levels.map(level => <LessonList key={level} {...{course, level}} />);
  const filter = <div className={classes.topMargin}><LessonFilter course={course}/></div>;
  return (
    <div role='main'>
      <Head title={courseTitle} description={getCourseIntroText(course, language)}/>
      <Grid container direction='column'>
        <Typography variant='headline'>{courseTitle}</Typography>
        <CourseInfo courseName={course}/>
        <Grid item container spacing={24}>
          <Grid item xs={12} sm={4} lg={2}>{filter}</Grid>
          {showPlaylists ?
            <Grid item xs={12} sm={8} lg={10}><PlaylistNavigation {...{course}}/></Grid>
            :
            <Grid item xs={12} sm={8} lg={10}>
              {lessonLists.length ? lessonLists :
                <Typography variant='headline' className={classes.topMargin}>
                  {t('coursepage.nomatchinglessons')}
                </Typography>
              }
            </Grid>
          }
        </Grid>
      </Grid>
    </div>
  );
};

CoursePage.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  }).isRequired,

  // mapStateToProps
  courseTitle: PropTypes.string.isRequired,
  levels: PropTypes.arrayOf(PropTypes.number).isRequired,
  t: PropTypes.func.isRequired,
  showPlaylists: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
};

const mapStateToProps = (state, {params}) => ({
  courseTitle: getCourseTitle(params.course, state.language),
  levels: getFilteredLevelsInCourse(state, params.course),
  t: getTranslator(state),
  showPlaylists: !getShowFiltergroups(state),
  language: state.language,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(CoursePage));
