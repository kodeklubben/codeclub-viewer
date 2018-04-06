import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseList.scss';
import CourseItem from './CourseItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const CourseList = ({courses, playlists}) => {
  const courseNames = playlists ? Object.keys(courses) :
    Object.keys(courses).sort((a, b) => courses[b].lessonCount - courses[a].lessonCount);
  return (
    <Row>
      <div className={styles.courseList}>
        {courseNames.map(courseName => {
          return (
            <Col key={courseName} xs={6} sm={6} md={4} lg={3}>
              <CourseItem course={courses[courseName]}/>
            </Col>
          );
        })}
      </div>
    </Row>
  );
};

CourseList.propTypes = {
  // ownProps
  courses: PropTypes.object,

  // mapStateToProps
  playlists: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  playlists: state.playlists,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(CourseList));
