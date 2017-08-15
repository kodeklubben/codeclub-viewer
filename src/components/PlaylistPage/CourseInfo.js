import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CollapsiblePanel from '../CollapsiblePanel';
import {getCourseInfoMarkup} from '../../util';
import {getTranslator} from '../../selectors/translate';

const CourseInfo = ({t, isStudentMode, courseInfo}) => {
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  return (
    <CollapsiblePanel initiallyExpanded={false} bsStyle={bsStyle} header={t('playlist.courseinfo')}>
        {courseInfo ?
          <div dangerouslySetInnerHTML={courseInfo} />
        :
          <h4>{t('playlist.courseinfonotfound')}</h4>
        }
    </CollapsiblePanel>
  );
};

CourseInfo.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  courseInfo: PropTypes.object.isRequired,
  isStudentMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state, {courseName}) => ({
  t: getTranslator(state),
  courseInfo: getCourseInfoMarkup(courseName, state.language),
  isStudentMode: state.isStudentMode
});

export default connect(
  mapStateToProps
)(CourseInfo);
