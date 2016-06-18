import React from 'react';
import CourseItem from './CourseItem';

const CourseList = React.createClass({

  render() {
    const courses = this.props.courses.map((course, idx) => {
      if (course.lessons.length == 0) return null;
      return (
        <CourseItem key={idx} course={course}/>
      );
    });

    return (
      <div>
        <h3>Kurs</h3>
        {courses}
      </div>
    );
  }
});

export default CourseList;
