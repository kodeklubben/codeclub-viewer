import React from 'react';
import PropTypes from 'prop-types';
import CourseItem from './CourseItem';
import Grid from '@material-ui/core/Grid';

const CourseList = ({courses}) => {
  const courseNames = Object.keys(courses).sort((a, b) => courses[b].lessonCount - courses[a].lessonCount);
  return (
    <Grid container>
      {courseNames.map(courseName => (
        <Grid key={courseName} item xs={6} sm={6} md={4} lg={3} xl={2}>
          <CourseItem course={courses[courseName]}/>
        </Grid>
      ))}
    </Grid>
  );
};

CourseList.propTypes = {
  // ownProps
  courses: PropTypes.object,
};

export default CourseList;
