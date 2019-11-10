import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {getCourseIcon} from '../resources/courseIcon';
import {getCourseTitle} from '../resources/courseFrontmatter';
import {Typography, Grid} from '@material-ui/core';

const PdfHeader = ({course}) => {
  const language = useSelector(state => state.language);
  
  const courseTitle = getCourseTitle(course, language);
  return (
    <Grid container alignItems='center'>
      <img height={50} src={getCourseIcon(course, 'black')} alt={courseTitle}/>
      <Typography variant='h5'>{courseTitle}</Typography>
    </Grid>
  );
};
PdfHeader.propTypes = {
  course: PropTypes.string.isRequired,
};

export default PdfHeader;
