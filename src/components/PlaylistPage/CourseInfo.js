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
  // ownProps:
  isStudentMode: PropTypes.bool,
  courseName: PropTypes.string,

  // mapStateToProps:
  t: PropTypes.func,
  courseInfo: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  t: getTranslator(state),
  courseInfo: getCourseInfoMarkup(ownProps.courseName, state.language)
});

export default connect(
  mapStateToProps
)(CourseInfo);
