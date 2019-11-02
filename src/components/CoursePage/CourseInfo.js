import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import CollapsiblePanel from '../CollapsiblePanel';
import {getCourseInfo} from '../../resources/courseContent';
import {getTranslator} from '../../selectors/translate';
import {processCourseInfo} from '../../utils/processCourseInfo';
import {getLanguageIndependentCoursePath} from '../../resources/courses';

const CourseInfo = ({courseName}) => {
  const t = useSelector(state => getTranslator(state));
  const language = useSelector(state => state.language);
  const isStudentMode = useSelector(state => state.isStudentMode);

  const courseInfo = {
    __html: processCourseInfo(
      getCourseInfo(courseName, language),
      {baseurl: getLanguageIndependentCoursePath(courseName)},
    ),
  };
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  return (
    <CollapsiblePanel initiallyExpanded={false} header={t('coursepage.courseinfo')} {...{bsStyle}}>
      {courseInfo.__html ?
        <Panel.Body><div dangerouslySetInnerHTML={courseInfo}/></Panel.Body>
        :
        <Panel.Body><h4>{t('coursepage.courseinfonotfound')}</h4></Panel.Body>
      }
    </CollapsiblePanel>
  );
};

CourseInfo.propTypes = {
  courseName: PropTypes.string.isRequired,
};

export default CourseInfo;
