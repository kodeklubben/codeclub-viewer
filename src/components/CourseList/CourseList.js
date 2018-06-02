import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseList.scss';
import CourseItem from './CourseItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const CourseList = ({courses}) => {
  return (
    <Row>
      <div className={styles.courseList}>
        {courses.map(course => (
          <Col key={course} xs={6} sm={6} md={4} lg={3}>
            <CourseItem course={course}/>
          </Col>
        ))}
      </div>
    </Row>
  );
};

CourseList.propTypes = {
  // ownProps
  courses: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(CourseList);
