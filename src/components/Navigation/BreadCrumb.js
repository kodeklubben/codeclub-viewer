import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import LevelIcon from '../LevelIcon';
import {getAvailableLanguages} from '../../utils/filterUtils';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import {getLanguageAndIsReadme, getLessonFrontmatter} from '../../resources/lessonFrontmatter';
import {getCourseIcon} from '../../resources/courseIcon';
import {getTranslator} from '../../selectors/translate';
import {getLevel} from '../../resources/lessons';

const styles = theme => ({
  button: {
    fontSize: 16,
    color: 'black',
    '&:hover, &:active, &:focus, &:visited': {
      color: 'black',
      textDecoration: 'none',
    },
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    '@media print': {
      display: 'none',
    },
  },
  courseImage: {
    height: 24,
  },
  homeIcon: {
    fontSize: 30,
  },
  text: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

const BreadCrumb = ({classes, course, lesson, file, courseLanguage, t}) => {
  const isLesson = !!lesson;
  const isCourse = course && !isLesson;

  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const {title:lessonTitle, path:lessonPath} = isLesson ?
    getLessonFrontmatter(course, lesson, lessonLanguage, isReadme) : {};

  const courseTitle = getCourseTitle(course, courseLanguage);
  const coursePath = isCourse || isLesson ? getLanguageIndependentCoursePath(course) : '';

  const options = {
    component: Link,
    className: classes.button,
  };

  const homeCrumb = <IconButton {...options} to={'/'} aria-label={t('general.home')}>
    <HomeIcon classes={{root: classes.homeIcon}}/>
  </IconButton>;

  const courseCrumb = <Button {...options} to={coursePath}>
    <img className={classes.courseImage} src={getCourseIcon(course)} alt={t('general.picture', {title: courseTitle})}/>
    <span className={classes.text}>{courseTitle}</span>
  </Button>;

  const lessonCrumb = <Button {...options} to={lessonPath} aria-label={lessonTitle}>
    <LevelIcon level={getLevel(course, lesson)}/>
    <span className={classes.text}>{lessonTitle}</span>
  </Button>;

  return <Grid container alignItems='center' wrap='nowrap'>
    {homeCrumb}
    {coursePath ? <Typography noWrap>/</Typography> : null}
    {coursePath ? courseCrumb : null}
    {isLesson ? <Typography noWrap>/</Typography> : null}
    {isLesson ? lessonCrumb : null}
  </Grid>;
};

BreadCrumb.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string,
  lesson: PropTypes.string,
  file: PropTypes.string,
  t: PropTypes.func.isRequired,

  // mapStateToProps
  courseLanguage: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

const mapStateToProps = (state) => ({
  courseLanguage: state.language,
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
