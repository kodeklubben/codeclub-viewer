import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getAvailableLanguages} from '../../utils/filterUtils';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import {getLanguageAndIsReadme, getLessonTitle, getLessonPath} from '../../resources/lessonFrontmatter';
import {getCourseIcon} from '../../resources/courseIcon';
import {getTranslator} from '../../selectors/translate';
import {getLevel} from '../../resources/lessons';

const BreadCrumb = ({course, lesson, file, courseLanguage, t}) => {
  const isLesson = !!lesson;
  const isCourse = course && !isLesson;

  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const lessonTitle = getLessonTitle(course, lesson, lessonLanguage, isReadme);
  const lessonPath = isLesson ? getLessonPath(course, lesson, lessonLanguage, isReadme) : null;

  const courseTitle = getCourseTitle(course, courseLanguage);
  const coursePath = isCourse || isLesson ? getLanguageIndependentCoursePath(course) : null;

  const homeCrumb = <NavLink to={'/'} aria-label={t('general.home')}>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;

  const courseCrumb = !coursePath ? null :
    <NavLink to={coursePath} className={styles.crumb}>
      <img className={styles.courseIcon} src={getCourseIcon(course)} alt={t('general.picture', {title: courseTitle})}/>
      <span className={styles.lesson}>{courseTitle}</span>
    </NavLink>;

  const lessonCrumb = !lessonPath ? null :
    <NavLink to={lessonPath} className={styles.crumb} aria-label={lessonTitle}>
      <LevelIcon level={getLevel(course, lesson)}/>
      <span className={styles.lesson}>{lessonTitle}</span>
    </NavLink>;

  return <div className={styles.breadcrumb}>
    {homeCrumb}
    {coursePath ? <span> / </span> : null}
    {courseCrumb}
    {isLesson ? <span> / </span> : null}
    {lessonCrumb}
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
