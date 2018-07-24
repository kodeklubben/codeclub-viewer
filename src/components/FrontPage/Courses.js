import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Courses.scss';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {getFilteredCourses, getFilteredExternalCoursesWithLanguages} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import {getCoursesWithPlaylists} from '../../resources/playlists';
import CourseList from '../CourseList/CourseList';
import ExternalCourseList from '../CourseList/ExternalCourseList';

const Courses = ({t, courses, externalCourses}) => {
  return (
    <Col xs={12} sm={8} md={9} lg={8} lgOffset={1}>
      {courses.length > 0 ?
        <Row>
          <Col xs={12}>
            <div className={styles.header}>{t('frontpage.courses')}</div>
            <CourseList courses={courses}/>
          </Col>
        </Row>
        : null}
      {externalCourses.length > 0 ?
        <Row>
          <Col xs={12}>
            <div className={styles.header}>{t('frontpage.otherwebsitecourses')}</div>
            <ExternalCourseList coursesWithLanguage={externalCourses}/>
          </Col>
        </Row>
        : null}
      {courses.length + externalCourses.length !== 0 ? null :
        <div className={styles.noMatchingLessons}>{t('coursepage.nomatchinglessons')}</div>}
    </Col>
  );
};

Courses.propTypes = {
  // mapStateToProps
  courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  externalCourses: PropTypes.arrayOf(PropTypes.shape({
    course: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.showPlaylists ? getCoursesWithPlaylists() : getFilteredCourses(state),
  externalCourses: state.showPlaylists ? [] : getFilteredExternalCoursesWithLanguages(state),
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(Courses));
