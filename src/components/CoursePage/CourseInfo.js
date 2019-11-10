import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Divider} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getCourseInfo} from '../../resources/courseContent';
import {getTranslator} from '../../selectors/translate';
import {processCourseInfo} from '../../utils/processCourseInfo';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {makeStyles} from '@material-ui/core/styles';
import {getCourseTitle} from '../../resources/courseFrontmatter';

const useStyles = makeStyles(theme => ({
  panel: {
    marginBottom: theme.spacing(4),
  },
}));

const CourseInfo = ({course}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const language = useSelector(state => state.language);
  const courseTitle = useSelector(state => getCourseTitle(course, state.language));

  const courseInfo = {
    __html: processCourseInfo(
      getCourseInfo(course, language),
      {baseurl: getLanguageIndependentCoursePath(course)},
    ),
  };

  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h5'>{t('coursepage.courseinfo')} {courseTitle}</Typography>
      </ExpansionPanelSummary>
      <Divider/>
      <ExpansionPanelDetails>
        {courseInfo.__html ?
          <Typography dangerouslySetInnerHTML={courseInfo}/>
          :
          <Typography>{t('coursepage.courseinfonotfound')}</Typography>
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

CourseInfo.propTypes = {
  course: PropTypes.string.isRequired,
};

export default CourseInfo;
