import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from '@material-ui/core/Grid';
import styles from './CoursePage.scss';
import {getTranslator} from '../selectors/translate';
import {getShowFiltergroups} from '../selectors/playlist';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/CoursePage/LessonList';
import PlaylistNavigation from '../components/CoursePage/PlaylistNavigation';
import CourseInfo from '../components/CoursePage/CourseInfo';
import {getCourseTitle} from '../resources/courseFrontmatter';
import {getCourseIntroText} from '../resources/courseContent';
import {getFilteredLevelsInCourse} from '../selectors/lesson';
import Head from '../components/Head';

const CoursePage = ({params, courseTitle, levels, t, showPlaylists, language}) => {
  const {course} = params;
  const lessonLists = levels.map(level => <LessonList key={level} {...{course, level}} />);
  const filter = <div className={styles.topMargin}><LessonFilter course={course}/></div>;
  return (
    <div>
      <Head title={courseTitle} description={getCourseIntroText(course, language)}/>
      <div className={styles.container}>
        <Grid container direction='column'>
          <h1>{courseTitle}</h1>
          <CourseInfo courseName={course}/>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4} lg={2}>{filter}</Grid>
            {showPlaylists ?
              <Grid item xs={12} sm={8} lg={10}><PlaylistNavigation {...{course}}/></Grid>
              :
              <Grid item xs={12} sm={8} lg={10}>
                {lessonLists.length ? lessonLists :
                  <h2 className={styles.topMargin}><b>{t('coursepage.nomatchinglessons')}</b></h2>
                }
              </Grid>
            }
          </Grid>
        }
        </Grid>
      </div>
    </div>
  );
};

CoursePage.propTypes = {
  // ownProps
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
