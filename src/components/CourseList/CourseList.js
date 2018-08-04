import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CourseItem from './CourseItem';
import Grid from '@material-ui/core/Grid';

const CourseList = ({courses, language}) => (
  <Grid container spacing={8}>
    {courses.map(course => (
      <Grid key={course} item xs={6} sm={6} md={4} lg={3} xl={2}>
        <CourseItem {...{course, language}}/>
      </Grid>
    ))}
  </Grid>
);

CourseList.propTypes = {
  // ownProps
  courses: PropTypes.arrayOf(PropTypes.string).isRequired,

  // mapStateToProps
  language: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps
)(CourseList);
