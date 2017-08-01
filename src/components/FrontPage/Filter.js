import React, {PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';

import {getTranslator} from '../../selectors/translate';
import FilterLabels from '../Filter/FilterLabels';
import LessonFilter from '../Filter/LessonFilter';

const Filter = ({isStudentMode, courseName, t}) => {
  return (
    <div>
      {/*Filter desktop*/}
      <Col xsHidden>
        <LessonFilter courseName={courseName}/>
      </Col>

      {/*Filter mobile*/}
      <Col smHidden mdHidden lgHidden>
        <LessonFilter courseName={courseName}/>
        <FilterLabels t={t}/>
      </Col>
    </div>
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
