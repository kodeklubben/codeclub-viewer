import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getTranslator} from '../../selectors/translate';
import LessonFilter from '../Filter/LessonFilter';

const Filter = ({isStudentMode, courseName, t}) => {
  return (
    <LessonFilter courseName={courseName}/>
  );
};

Filter.propTypes = {
  // ownProps:
  isStudentMode: PropTypes.bool,
  courseName: PropTypes.string,

  // mapStateToProps:
  t: PropTypes.func
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(Filter);
