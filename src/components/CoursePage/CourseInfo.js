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
  root: {
    background: theme.palette.secondary.main,
    flexGrow: 1,
  },
  details: {
    '& a': {
      color: theme.palette.primary.main,
    },
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
    <ExpansionPanel TransitionProps={{ unmountOnExit: true }} classes={{ root: classes.root }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color='primary'/>}>
        <Typography variant='h5'>{t('coursepage.courseinfo')} {courseTitle}</Typography>
      </ExpansionPanelSummary>
      <Divider/>
      <ExpansionPanelDetails>
        {courseInfo.__html ?
          <div className={classes.details} dangerouslySetInnerHTML={courseInfo}/>
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
