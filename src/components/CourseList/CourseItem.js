import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import PopoverComponent from '../PopoverComponent';
import Flag from '../Flag';
import LessonCount from './LessonCount';
import {getShowFiltergroups} from '../../selectors/playlist';
import {getCourseFrontmatter, getCourseTitle, getLanguageIndependentCoursePath} from '../../resources/courseFrontmatter';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';
import {getFilteredLessonsInCourseCountPerLanguage} from '../../selectors/lesson';
import {onlyCheckedMainLanguage} from '../../selectors/filter';

const CourseItem = ({course, language, showLessonCount, lessonsPerLanguage, coursePath, onlyCheckedMainLanguage}) => {
  const courseTitle = getCourseTitle(course, language);
  const {external:externalLink} = getCourseFrontmatter(course, language);
  const popoverContent = getCourseIntro(course, language);

  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
    </PopoverComponent>
    : null;

  const lessonCounts = !externalLink && showLessonCount ?
    <div>
      {Object.keys(lessonsPerLanguage).map(language =>
        <LessonCount
          key={language}
          count={lessonsPerLanguage[language]}
          language={language}
          showFlag={!onlyCheckedMainLanguage}
        />)
      }
    </div> :
    null;

  return (
    <div>
      {externalLink ?
        <a className={styles.courseItem} href={externalLink} target='_blank'>
          <img className={styles.courseLogo} src={getCourseIcon(course)} alt={courseTitle}/>
          <span className={styles.courseName}>
            {courseTitle}
            {popoverButton}
            <Glyphicon className={styles.externalGlyph} glyph='new-window'/>
          </span>
          {!onlyCheckedMainLanguage ? <span><Flag language={language}/></span> : null}
        </a>
        :
        <Link className={styles.courseItem} to={coursePath}>
          <img className={styles.courseLogo} src={getCourseIcon(course)} alt={courseTitle}/>
          <span className={styles.courseName}>{courseTitle}{popoverButton}</span>
          {lessonCounts}
        </Link>
      }
    </div>);
};

CourseItem.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,

  // mapStateToProps
  showLessonCount: PropTypes.bool.isRequired,
  lessonsPerLanguage: PropTypes.objectOf(PropTypes.number),
  coursePath: PropTypes.string,
  onlyCheckedMainLanguage: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course}) => {
  const showLessonCount = getShowFiltergroups(state);
  return {
    showLessonCount,
    lessonsPerLanguage: showLessonCount ? getFilteredLessonsInCourseCountPerLanguage(state, course) : null,
    coursePath: getLanguageIndependentCoursePath(course),
    onlyCheckedMainLanguage: onlyCheckedMainLanguage(state),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(CourseItem));
