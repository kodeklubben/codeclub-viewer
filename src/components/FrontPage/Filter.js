import React, {PropTypes} from 'react';
import LessonFilter from '../Filter/LessonFilter';

const Filter = ({courseName}) => {
  return (
    <LessonFilter courseName={courseName}/>
  );
};

Filter.propTypes = {
  // ownProps:
  courseName: PropTypes.string,
};

export default (Filter);
