import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CollapsiblePanel from '../CollapsiblePanel';
import {getCourseInfo} from '../../resources/courseContent';
import {getTranslator} from '../../selectors/translate';
import {processCourseInfo} from '../../utils/processCourseInfo';
import {getLanguageIndependentCoursePath} from '../../resources/courses';

const CourseInfo = ({t, courseInfo}) => (
  <CollapsiblePanel defaultExpanded={false} header={t('coursepage.courseinfo')}>
    {courseInfo.__html ?
      <div dangerouslySetInnerHTML={courseInfo}/>
      :
      <h2>{t('coursepage.courseinfonotfound')}</h2>
    }
  </CollapsiblePanel>
);

CourseInfo.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  courseInfo: PropTypes.shape({__html: PropTypes.string}).isRequired,
};

const mapStateToProps = (state, {courseName}) => ({
  t: getTranslator(state),
  courseInfo: {
    __html: processCourseInfo(
      getCourseInfo(courseName, state.language),
      {baseurl: getLanguageIndependentCoursePath(courseName)},
    ),
  },
});

export default connect(
  mapStateToProps
)(CourseInfo);
