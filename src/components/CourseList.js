import React, {PropTypes} from 'react';
import CourseItem from './CourseItem';

const CourseList = React.createClass({
  sortCourses(a, b) {
    return b.lessons.length - a.lessons.length;
  },
  render() {
    const sortedCourses = this.props.courses.sort(this.sortCourses);
    const courses = sortedCourses.map((course, idx) => {
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

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      iconPath: PropTypes.string,
      lessons: PropTypes.array
    })
  )
};

export default CourseList;
