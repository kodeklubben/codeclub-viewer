import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
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

const CoursePage = ({params}) => {
  useStyles(styles);

  const {course} = params;
  
  const courseTitle = useSelector(state => getCourseTitle(course, state.language));
  const levels = useSelector(state => getFilteredLevelsInCourse(state, course));
  const t = useSelector(state => getTranslator(state));
  const showPlaylists = useSelector(state => !getShowFiltergroups(state));
  const language = useSelector(state => state.language);

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
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  }).isRequired,
};

export default CoursePage;
