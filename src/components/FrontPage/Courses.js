import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import {getFilteredCourses, getFilteredExternalCourses} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import CourseList from '../CourseList/CourseList';

export const Courses = React.createClass({

  render() {
    const {courses, externalCourses, t} = this.props;
    return (
      <Col xs={12} sm={8} md={9} lg={8} lgOffset={1}>
        <Row>
          <Col xs={12}>
            <h2>{t('frontpage.courses')}</h2>
            <CourseList courses={this.props.courses}/>
          </Col>
        </Row>
        {Object.keys(this.props.externalCourses).length > 0 ?
          <Row>
            <Col xs={12}>
              <h2>{t('frontpage.otherwebsitecourses')}</h2>
              <CourseList courses={this.props.externalCourses}/>
            </Col>
          </Row>
        :null}
      </Col>
    );
  }

});

Courses.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    externalCourses: getFilteredExternalCourses(state),
    t: getTranslator(state)
  };
}

export const CoursesContainer = connect(
  mapStateToProps
)(Courses);
