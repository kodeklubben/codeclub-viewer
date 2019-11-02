import React from 'react';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Courses.scss';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {getFilteredCourses, getFilteredExternalCoursesWithLanguages} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import {getCoursesWithPlaylists} from '../../resources/playlists';
import CourseList from '../CourseList/CourseList';
import ExternalCourseList from '../CourseList/ExternalCourseList';

const Courses = () => {
  useStyles(styles);

  const courses = useSelector(state => state.showPlaylists ? getCoursesWithPlaylists() : getFilteredCourses(state));
  const externalCourses = useSelector(state =>
    state.showPlaylists ? [] : getFilteredExternalCoursesWithLanguages(state)
  );
  const t = useSelector(state => getTranslator(state));

  return (
    <Col xs={12} sm={8} md={9} lg={8} lgOffset={1}>
      {courses.length > 0 ?
        <Row>
          <Col xs={12}>
            <h1 className={styles.header}>{t('frontpage.courses')}</h1>
            <CourseList courses={courses}/>
          </Col>
        </Row>
        : null}
      {externalCourses.length > 0 ?
        <Row>
          <Col xs={12}>
            <h1 className={styles.header}>{t('frontpage.otherwebsitecourses')}</h1>
            <ExternalCourseList coursesWithLanguage={externalCourses}/>
          </Col>
        </Row>
        : null}
      {courses.length + externalCourses.length !== 0 ? null :
        <h1 className={styles.noMatchingLessons}>{t('coursepage.nomatchinglessons')}</h1>}
    </Col>
  );
};

export default Courses;
