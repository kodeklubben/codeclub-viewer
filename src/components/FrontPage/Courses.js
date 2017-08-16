import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {getFilteredCourses, getFilteredExternalCourses} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import CourseList from '../CourseList/CourseList';

const Courses = ({t, courses, externalCourses}) => {
  return (
    <Col xs={12} sm={8} md={9} lg={8} lgOffset={1}>
      <Row>
        <Col xs={12}>
          <h2>{t('frontpage.courses')}</h2>
          <CourseList courses={courses}/>
        </Col>
      </Row>
      {Object.keys(externalCourses).length > 0 ?
        <Row>
          <Col xs={12}>
            <h2>{t('frontpage.otherwebsitecourses')}</h2>
            <CourseList courses={externalCourses}/>
          </Col>
        </Row>
      :null}
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
)(Courses);
