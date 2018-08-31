import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import styles from './CoursePage.scss';
import {getTranslator} from '../selectors/translate';
import {getShowFiltergroups} from '../selectors/playlist';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/CoursePage/LessonList';
import LevelNavigation from '../components/CoursePage/LevelNavigation';
import PlaylistNavigation from '../components/CoursePage/PlaylistNavigation';
import CourseInfo from '../components/CoursePage/CourseInfo';
import {getCourseTitle} from '../resources/courseFrontmatter';
import {getCourseIntroText} from '../resources/courseContent';
import {getFilteredLevelsInCourse} from '../selectors/lesson';
import Head from '../components/Head';

const CoursePage = ({params, courseTitle, levels, t, showPlaylists, language}) => {
  const {course} = params;
  const lessonLists = levels.map(level => <LessonList key={level} {...{course, level}} />);
  const filter = <Col xs={12} sm={3} className={styles.topMargin}>
    <LessonFilter course={course}/>
  </Col>;
  const jumpTo = levels.length > 0 ? <div><LevelNavigation {...{levels}}/></div> : null;
  const jumpToAffixed = jumpTo ?
    <Col xsHidden sm={3} className={styles.jumpTo}>
      <AutoAffix viewportOffsetTop={15}>
        {jumpTo}
      </AutoAffix>
    </Col> : null;
  return (
    <div role='main'>
      <Head title={courseTitle} description={getCourseIntroText(course, language)}/>
      <Grid fluid={true}>
        <Row>
          <Col xs={12}><h1>{courseTitle}</h1></Col>
          <Col xs={12}><CourseInfo courseName={course}/></Col>
        </Row>
        {showPlaylists ?
          <Row>
            {filter}
            <Col xs={12} sm={9}><PlaylistNavigation {...{course}}/></Col>
          </Row>
          :
          <Row>
            {filter}
            <Col xs={12} smHidden mdHidden lgHidden>{jumpTo}</Col>
            <Col xs={12} sm={6}>
              {lessonLists.length ?
                lessonLists :
                <div className={styles.noMatchingLessons}>{t('coursepage.nomatchinglessons')}</div>
              }
            </Col>
            {jumpToAffixed}
          </Row>
        }
      </Grid>
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
