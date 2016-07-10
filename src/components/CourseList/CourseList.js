import React, {PropTypes} from 'react';
import CourseItem from './CourseItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';


const CourseList = React.createClass({
  sortCourses(a, b) {
    const courses = this.props.courses;
    return courses[b].lessonCount - courses[a].lessonCount;
  },
  render() {
    const courses = this.props.courses;
    const courseNames = Object.keys(courses).sort(this.sortCourses);

    return (
      <Row>
        {courseNames.map((courseName, idx) => (
          <Col key={idx} xs={6} sm={4} md={3} lg={2}>
            <CourseItem course={courses[courseName]}/>
          </Col>
        ))}
      </Row>
    );
  }
});

CourseList.propTypes = {
  courses: PropTypes.object
};

export default CourseList;
