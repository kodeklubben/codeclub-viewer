import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseList.scss';
import CourseItem from './CourseItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const CourseList = ({courses}) => {
  const courseNames = Object.keys(courses).sort((a, b) => courses[b].lessonCount - courses[a].lessonCount);

  return (
    <Row>
      <div className={styles.courseList}>
        {courseNames.map((courseName, idx) => (
          <Col key={idx} xs={6} sm={6} md={4} lg={3}>
            <CourseItem course={courses[courseName]}/>
          </Col>
        ))}
      </div>
    </Row>
  );
};

CourseList.propTypes = {
  // ownProps
  courses: PropTypes.object
};

export default withStyles(styles)(CourseList);
