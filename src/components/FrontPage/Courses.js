import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Courses.scss';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {getFilteredCourses, getFilteredExternalCourses} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import CourseList from '../CourseList/CourseList';

const Courses = ({t, courses, externalCourses}) => {
  const coursesLength = Object.keys(courses).length;
  const externalCoursesLength = Object.keys(externalCourses).length;
  return (
    <Col xs={12} sm={8} md={9} lg={8} lgOffset={1}>
      {coursesLength > 0 ?
        <Row>
          <Col xs={12}>
            <div className={styles.header}>{t('frontpage.courses')}</div>
            <CourseList courses={courses}/>
          </Col>
        </Row>
        : null}
      {externalCoursesLength > 0 ?
        <Row>
          <Col xs={12}>
            <div className={styles.header}>{t('frontpage.otherwebsitecourses')}</div>
            <CourseList courses={externalCourses}/>
          </Col>
        </Row>
        :null}
      {coursesLength + externalCoursesLength !== 0 ? null :
        <div className={styles.noMatchingLessons}>{t('playlist.nomatchinglessons')}</div>}
    </Col>
  );
};

Courses.propTypes = {
  // mapStateToProps
  courses: PropTypes.object.isRequired,
  externalCourses: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  courses: getFilteredCourses(state),
  externalCourses: getFilteredExternalCourses(state),
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(Courses));
