import React, {PropTypes} from 'react';
import CourseItem from './CourseItem';
import styles from './CourseList.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


const CourseList = React.createClass({
  sortCourses(a, b) {
    const courses = this.props.courses;
    return courses[b].lessons.length - courses[a].lessons.length;
  },
  render() {
    const courses = this.props.courses;
    const courseNames = Object.keys(courses).sort(this.sortCourses);
    const courseNodes = courseNames.map((courseName, idx) => (
      courses[courseName].length === 0 ? null : <CourseItem key={idx} course={courses[courseName]}/>
    ));

    return (
      <div className={styles.courseList}>
        {courseNodes}
      </div>
    );
  }
});

CourseList.propTypes = {
  courses: PropTypes.object
};

export default withStyles(styles)(CourseList);
