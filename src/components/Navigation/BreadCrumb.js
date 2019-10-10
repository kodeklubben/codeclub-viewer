import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory, matchPath} from 'react-router-dom';
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

const BreadCrumb = () => {
  useStyles(styles);

  const {courseLanguage, t} = useSelector(state => ({
    courseLanguage: state.language,
    t: getTranslator(state),
  }));

  const history = useHistory();
  const matchLesson = matchPath(history.location.pathname, {path: '/:course/:lesson/:file'});
  const matchCourse = matchPath(history.location.pathname, {path: '/:course'});
  const {course} = matchCourse != null ? matchCourse.params : '';
  const {lesson, file} = matchLesson != null ? matchLesson.params : '';

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

export default BreadCrumb;
