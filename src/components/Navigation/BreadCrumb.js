import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {capitalize} from '../../util';
import {getTitle, getLevel} from '../../selectors/frontmatter';
import {getCourseIcon, isValidCoursePath, isValidLessonPath} from '../../contexts';

const BreadCrumb = ({params, title, level, courseIcon}) => {
  const {course, lesson, file} = params;
  const isLesson = !!file;
  const isCourse = course && !isLesson;
  const coursePath = `/${course}`;
  const lessonPath = `/${course}/${lesson}/${file}`;
  const isValidCourse = isCourse && isValidCoursePath(coursePath);
  const isValidLesson = isLesson && isValidLessonPath(lessonPath);

  const homeLink = <NavLink to='/' onlyActiveOnIndex>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;

  const courseLink = <NavLink to={coursePath} className={styles.lessonLink}>
    <img className={styles.courseIcon} src={courseIcon}/>
    <span className={styles.lesson}>{capitalize(course)}</span>
  </NavLink>;

  const lessonLink = <NavLink to={lessonPath} className={styles.lessonLink}>
    <LevelIcon {...{level}}/>
    <span className={styles.lesson}>{title}</span>
  </NavLink>;

  return <div className={styles.breadcrumb}>
    {homeLink}
    {isValidCourse || isValidLesson ? <span> / </span> : null}
    {isValidCourse || isValidLesson ? courseLink : null}
    {isValidLesson ? <span> / </span> : null}
    {isValidLesson ? lessonLink : null}
  </div>;
};

BreadCrumb.propTypes = {
  // ownProps
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }).isRequired,

  // mapStateToProps
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  courseIcon: PropTypes.string,
};

const mapStateToProps = (state, {params}) => ({
  title: getTitle(state, params),
  level: getLevel(state, params),
  courseIcon: getCourseIcon(params.course),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(BreadCrumb));
