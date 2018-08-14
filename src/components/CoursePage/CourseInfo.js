import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CollapsiblePanel from '../CollapsiblePanel';
import {getCourseInfo} from '../../resources/courseContent';
import {getTranslator} from '../../selectors/translate';
import {processCourseInfo} from '../../utils/processCourseInfo';
import {getLanguageIndependentCoursePath} from '../../resources/courses';

const CourseInfo = ({t, courseInfo}) => {
  const header = <Typography variant='title'>{t('coursepage.courseinfo')}</Typography>;
  return (
    <CollapsiblePanel defaultExpanded={false} {...{header}}>
      {courseInfo.__html ?
        <Typography component='div' dangerouslySetInnerHTML={courseInfo}/>
        :
        <Typography variant='body2'>{t('coursepage.courseinfonotfound')}</Typography>
      }
    </CollapsiblePanel>
  );
};

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
