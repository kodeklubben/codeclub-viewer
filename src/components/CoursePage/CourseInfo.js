import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CollapsiblePanel from '../CollapsiblePanel';
import {getCourseInfo} from '../../resources/courseContent';
import {getTranslator} from '../../selectors/translate';

const CourseInfo = ({t, isStudentMode, courseInfo}) => {
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  return (
    <CollapsiblePanel initiallyExpanded={false} header={t('coursepage.courseinfo')} {...{bsStyle}}>
      {courseInfo ?
        <div dangerouslySetInnerHTML={courseInfo}/>
        :
        <h4>{t('coursepage.courseinfonotfound')}</h4>
      }
    </CollapsiblePanel>
  );
};

CourseInfo.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  courseInfo: PropTypes.object,
  isStudentMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state, {courseName}) => ({
  t: getTranslator(state),
  courseInfo: getCourseInfo(courseName, state.language),
  isStudentMode: state.isStudentMode
});

export default connect(
  mapStateToProps
)(CourseInfo);
