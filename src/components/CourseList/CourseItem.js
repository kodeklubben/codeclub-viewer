import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'react-router/lib/Link';
import PopoverComponent from '../PopoverComponent';
import Flag from '../Flag';
import LessonCount from './LessonCount';
import {getShowFiltergroups} from '../../selectors/playlist';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';
import {onlyCheckedMainLanguage} from '../../selectors/filter';
import {getCourseExternalLink, getCourseTitle} from '../../resources/courseFrontmatter';
import {getLanguageIndependentCoursePath} from '../../resources/courses';

const styles = theme => ({
  courseItem: {
    color: grey[800],
    margin: '25px',
    maxWidth: '175px',
    cursor: 'pointer',
    '&:link': {
      'text-decoration': 'none',
    },
  },
  courseLogo: {
    maxWidth: '100%',
    padding: '5px',
    height: '170px',
    marginBottom: '15px',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        padding: '0',
      },
    },
  },
  courseName: {
    fontSize: '1.3em',
    'white-space': 'nowrap',
    color: grey[900],
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1em',
    },
  },
  popover: {
    marginBottom: '4px',
  },
  icon: {
    marginLeft: '3px',
    'padding-top': '4px',
  },
});

const CourseItem = ({classes, course, language, showLessonCount, coursePath, onlyCheckedMainLanguage}) => {
  const courseTitle = getCourseTitle(course, language);
  const externalLink = getCourseExternalLink(course, language);
  const popoverContent = getCourseIntro(course, language);
  const popoverButton = popoverContent ? <PopoverComponent {...{popoverContent}}/> : null;
  return (
    <Grid container direction='column'>
      {externalLink ?
        <a className={classes.courseItem} href={externalLink} target='_blank'>
          <img className={classes.courseLogo} src={getCourseIcon(course)} alt={courseTitle}/>
          <Grid container  alignItems='center' wrap='nowrap' justify='center' className={classes.courseName}>
            <Grid item>{courseTitle}</Grid>
            <Grid item className={classes.icon}><LaunchIcon/></Grid>
            <Grid item className={classes.popover}>{popoverButton}</Grid>
          </Grid>
          {!onlyCheckedMainLanguage ?
            <Grid container justify='center'>
              <Flag language={language}/>
            </Grid>
            : null}
        </a>
        :
        <Link className={classes.courseItem} to={coursePath}>
          <img className={classes.courseLogo} src={getCourseIcon(course)} alt={courseTitle}/>
          <Grid container alignItems='center' wrap='nowrap' justify='center' className={classes.courseName}>
            <Grid item>{courseTitle}</Grid>
            <Grid item className={classes.popover}>{popoverButton}</Grid>
          </Grid>
          {showLessonCount ? <LessonCount {...{course}}/> : null}
        </Link>
      }
    </Grid>);
};

CourseItem.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,

  // mapStateToProps
  showLessonCount: PropTypes.bool.isRequired,
  coursePath: PropTypes.string,
  onlyCheckedMainLanguage: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course}) => ({
  showLessonCount: getShowFiltergroups(state),
  coursePath: getLanguageIndependentCoursePath(course),
  onlyCheckedMainLanguage: onlyCheckedMainLanguage(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(CourseItem));
