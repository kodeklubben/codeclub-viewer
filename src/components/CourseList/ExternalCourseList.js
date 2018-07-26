import React from 'react';
import PropTypes from 'prop-types';
import CourseItem from './CourseItem';
import Grid from '@material-ui/core/Grid';

const ExternalCourseList = ({coursesWithLanguage}) => (
  <Grid container>
    {coursesWithLanguage.map(({course, language}) => (
      <Grid key={`${course}_${language}`} item xs={6} sm={6} md={4} lg={3} xl={2}>
        <CourseItem {...{course, language}}/>
      </Grid>
    ))}
  </Grid>
);

ExternalCourseList.propTypes = {
  // ownProps
  coursesWithLanguage: PropTypes.arrayOf(PropTypes.shape({
    course: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  })).isRequired,
};

export default ExternalCourseList;
