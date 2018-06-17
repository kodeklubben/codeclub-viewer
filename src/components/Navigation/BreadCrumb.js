import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getAvailableLanguages} from '../../util';
import {getCourseTitle, getLanguageIndependentCoursePath} from '../../resources/courseFrontmatter';
import {getLanguageAndIsReadme, getLessonFrontmatter} from '../../resources/lessonFrontmatter';
import {getCourseIcon} from '../../resources/courseIcon';

const BreadCrumb = ({course, lesson, file, courseLanguage}) => {
  const isLesson = !!lesson;
  const isCourse = course && !isLesson;

  const coursePath = isCourse ? getLanguageIndependentCoursePath(course) : '';
  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const {path:lessonPath, title:lessonTitle, level} =
    isLesson ? getLessonFrontmatter(course, lesson, lessonLanguage, isReadme).path : {};

  const homeCrumb = <NavLink to={isCourse || isLesson ? '/' : ''}>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;

  const courseCrumb = <NavLink to={coursePath} className={styles.lessonLink}>
    <img className={styles.courseIcon} src={getCourseIcon(course)}/>
    <span className={styles.lesson}>{getCourseTitle(course, courseLanguage)}</span>
  </NavLink>;

  const lessonCrumb = <NavLink className={styles.lessonLink}>
    <LevelIcon {...{level}}/>
    <span className={styles.lesson}>{lessonTitle}</span>
  </NavLink>;

  return <div className={styles.breadcrumb}>
    {homeCrumb}
    {coursePath || lessonPath ? <span> / </span> : null}
    {coursePath || lessonPath ? courseCrumb : null}
    {lessonPath ? <span> / </span> : null}
    {lessonPath ? lessonCrumb : null}
  </div>;
};

BreadCrumb.propTypes = {
  // ownProps
  course: PropTypes.string,
  lesson: PropTypes.string,
  file: PropTypes.string,

  // mapStateToProps
  courseLanguage: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

const mapStateToProps = (state) => ({
  courseLanguage: state.language,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
