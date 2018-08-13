import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
import {getTranslator} from '../../selectors/translate';

const styles = theme => ({
  courseItem: {
    margin: '25px auto',
    maxWidth: '175px',
    '&:link': {
      textDecoration: 'none',
    },
  },
  courseLogo: {
    maxWidth: '100%',
    height: '170px',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  },
  courseName: {
    fontSize: '1.3em',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1em',
    },
  },
  popover: {
    marginBottom: '4px',
  },
  icon: {
    color: 'black',
    marginLeft: '3px',
    paddingTop: '4px',
  },
});

const CourseItem = ({classes, course, language, showLessonCount, coursePath, onlyCheckedMainLanguage, t}) => {
  const courseTitle = getCourseTitle(course, language);
  const externalLink = getCourseExternalLink(course, language);
  const popoverContent = getCourseIntro(course, language);
  const popoverButton = popoverContent ? <PopoverComponent inFilter={false} {...{popoverContent}}/> : null;
  const courseIcon = (
    <img
      className={classes.courseLogo}
      src={getCourseIcon(course)}
      alt={t('general.picture', {title: courseTitle})}
    />
  );
  return (
    <Grid container direction='column'>
      {externalLink ?
        <a className={classes.courseItem} href={externalLink} target='_blank' rel='noopener'>
          {courseIcon}
          <Grid container alignItems='center' wrap='nowrap' justify='center' className={classes.courseName}>
            <Typography variant='title'>{courseTitle}</Typography>
            <Grid item className={classes.icon}><LaunchIcon/></Grid>
            <Grid item className={classes.popover}>{popoverButton}</Grid>
          </Grid>
          {!onlyCheckedMainLanguage ?
            <Grid container justify='center'>
              <Flag {...{language}}/>
            </Grid>
            : null}
        </a>
        :
        <Link className={classes.courseItem} to={coursePath}>
          {courseIcon}
          <Grid container alignItems='center' wrap='nowrap' justify='center' className={classes.courseName}>
            <Typography variant='title'>{courseTitle}</Typography>
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
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {course}) => ({
  showLessonCount: getShowFiltergroups(state),
  coursePath: getLanguageIndependentCoursePath(course),
  onlyCheckedMainLanguage: onlyCheckedMainLanguage(state),
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(CourseItem));
