import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import {getFilteredCourses, getFilteredExternalCourses} from '../../selectors/course';
import CourseList from '../CourseList/CourseList';

export const Courses = React.createClass({

  render() {
    return (
      <Col xs={12} sm={8} md={9} lg={10}>
        <Row>
          <Col xs={12}>
            <h2>Kurs</h2>
            <CourseList courses={this.props.courses}/>
          </Col>
        </Row>
        {Object.keys(this.props.externalCourses).length > 0 ?
          <Row>
            <Col xs={12}>
              <h2>Kurs på andre nettsider</h2>
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
  externalCourses: PropTypes.object
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    externalCourses: getFilteredExternalCourses(state)
  };
}

export const CoursesContainer = connect(
  mapStateToProps
)(Courses);
