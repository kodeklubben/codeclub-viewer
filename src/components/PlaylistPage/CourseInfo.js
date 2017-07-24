import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';

import {getCourseInfoMarkup} from '../../util';
import {getTranslator} from '../../selectors/translate';

const CourseInfo = ({t, isStudentMode, courseInfo}) => {
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  return (
    <Panel collapsible defaultExpanded={false} bsStyle={bsStyle} header={t('playlist.courseinfo')}>
        {courseInfo ?
          <div dangerouslySetInnerHTML={courseInfo} />
        :
          <h4>{t('playlist.courseinfonotfound')}</h4>
        }
    </Panel>
  );
};

CourseInfo.propTypes = {
  // ownProps:
  isStudentMode: PropTypes.bool,

  // mapStateToProps:
  t: PropTypes.func,
  courseInfo: PropTypes.object
};

/**
 * Input props: courseName
 */
function mapStateToProps(state, props) {
  return {
    t: getTranslator(state),
    courseInfo: getCourseInfoMarkup(props.courseName, state.language)
  };
}

export default connect(mapStateToProps)(CourseInfo);
