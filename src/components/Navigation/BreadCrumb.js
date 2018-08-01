import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getAvailableLanguages} from '../../util';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import {getLanguageAndIsReadme, getLessonFrontmatter} from '../../resources/lessonFrontmatter';
import {getCourseIcon} from '../../resources/courseIcon';
import {getTranslator} from '../../selectors/translate';
import {getLevel} from '../../resources/lessons';

const BreadCrumb = ({course, lesson, file, courseLanguage, t}) => {
  const isLesson = !!lesson;
  const isCourse = course && !isLesson;

  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const {title:lessonTitle} = isLesson ? getLessonFrontmatter(course, lesson, lessonLanguage, isReadme) : {};

  const homeCrumb = <NavLink to={'/'} aria-label={t('general.home')}>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;

  const courseTitle = getCourseTitle(course, courseLanguage);
  const coursePath = getLanguageIndependentCoursePath(course);
  const courseCrumb = <NavLink to={coursePath} className={styles.crumb}>
    <img className={styles.courseIcon} src={getCourseIcon(course)} alt={t('general.picture') + courseTitle}/>
    <span className={styles.lesson}>{courseTitle}</span>
  </NavLink>;

  const {path:lessonPath} = getLessonFrontmatter(course, lesson, lessonLanguage, isReadme);
  const lessonCrumb = <NavLink to={lessonPath} className={styles.crumb} aria-label={lessonTitle}>
    <LevelIcon level={getLevel(course, lesson)}/>
    <span className={styles.lesson}>{lessonTitle}</span>
  </NavLink>;

  return <div className={styles.breadcrumb}>
    {homeCrumb}
    {isCourse || isLesson ? <span> / </span> : null}
    {isCourse || isLesson ? courseCrumb : null}
    {isLesson ? <span> / </span> : null}
    {isLesson ? lessonCrumb : null}
  </div>;
};

BreadCrumb.propTypes = {
  // ownProps
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
