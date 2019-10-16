import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import NavLink from './NavLink';
import LevelIcon from '../LevelIcon';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styles from './BreadCrumb.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import {getLanguageAndIsReadme, getLessonTitle, getLessonPath} from '../../resources/lessonFrontmatter';
import {getCourseIcon} from '../../resources/courseIcon';
import {getTranslator} from '../../selectors/translate';
import {getLevel} from '../../resources/lessons';

const BreadCrumb = ({course, lesson, file}) => {
  useStyles(styles);

  const courseLanguage = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));

  const isLesson = !!lesson;
  const isCourse = course && !isLesson;

  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const lessonTitle = getLessonTitle(course, lesson, lessonLanguage, isReadme);
  const lessonPath = getLessonPath(course, lesson, lessonLanguage, isReadme);

  const courseTitle = getCourseTitle(course, courseLanguage);
  const coursePath = isCourse || isLesson ? getLanguageIndependentCoursePath(course) : '';

  const homeCrumb = <NavLink to={'/'} aria-label={t('general.home')}>
    <Glyphicon glyph='home' className={styles.homeIcon}/>
  </NavLink>;

  const courseCrumb = <NavLink to={coursePath} className={styles.crumb}>
    <img className={styles.courseIcon} src={getCourseIcon(course)} alt={t('general.picture', {title: courseTitle})}/>
    <span className={styles.lesson}>{courseTitle}</span>
  </NavLink>;

  const lessonCrumb = <NavLink to={lessonPath} className={styles.crumb} aria-label={lessonTitle}>
    <LevelIcon level={getLevel(course, lesson)}/>
    <span className={styles.lesson}>{lessonTitle}</span>
  </NavLink>;

  return <div className={styles.breadcrumb}>
    {homeCrumb}
    {coursePath ? <span> / </span> : null}
    {coursePath ? courseCrumb : null}
    {isLesson ? <span> / </span> : null}
    {isLesson ? lessonCrumb : null}
  </div>;
};

BreadCrumb.propTypes = {
  course: PropTypes.string,
  lesson: PropTypes.string,
  file: PropTypes.string,
};

export default BreadCrumb;
