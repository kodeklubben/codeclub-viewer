import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import renderHTML from 'react-render-html';
import CollapsiblePanel from '../CollapsiblePanel';
import {getCourseInfo} from '../../resources/courseContent';
import {getTranslator} from '../../selectors/translate';
import {processCourseInfo} from '../../utils/processCourseInfo';
import {getLanguageIndependentCoursePath} from '../../resources/courses';

const CourseInfo = ({t, isStudentMode, courseInfo}) => {
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  return (
    <CollapsiblePanel initiallyExpanded={false} header={t('coursepage.courseinfo')} {...{bsStyle}}>
      {courseInfo ?
        <div>{renderHTML(courseInfo)}</div>
        :
        <h4>{t('coursepage.courseinfonotfound')}</h4>
      }
    </CollapsiblePanel>
  );
};

CourseInfo.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  courseInfo: PropTypes.string.isRequired,
  isStudentMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state, {courseName}) => ({
  t: getTranslator(state),
  courseInfo: processCourseInfo(
    getCourseInfo(courseName, state.language),
    {baseurl: getLanguageIndependentCoursePath(courseName)},
  ),
  isStudentMode: state.isStudentMode
});

export default connect(
  mapStateToProps
)(CourseInfo);
