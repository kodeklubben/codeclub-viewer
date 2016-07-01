import React, {PropTypes} from 'react';
import CourseItem from './CourseItem';

const CourseList = React.createClass({
  sortCourses(a, b) {
    const courses = this.props.courses;
    return courses[b].lessons.length - courses[a].lessons.length;
  },
  render() {
    const courses = this.props.courses;
    const courseNames = Object.keys(courses).sort(this.sortCourses);
    const courseNodes = courseNames.map((courseName, idx) => {
      const course = courses[courseName];
      if (course.lessons.length === 0) return null;
      return (
        <CourseItem key={idx} course={course}/>
      );
    });

    return (
      <div>
        <h3>Kurs</h3>
        {courseNodes}
      </div>
    );
  }
});

CourseList.propTypes = {
  courses: PropTypes.object
};

export default CourseList;
