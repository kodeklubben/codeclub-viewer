import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';
import PopoverComponent from '../PopoverComponent';
import Flag from '../Flag';
import {getShowFiltergroups} from '../../selectors/playlist';
import {getCourseFrontmatter, getCourseTitle, getLanguageIndependentCoursePath} from '../../resources/courseFrontmatter';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';
import {getFilteredLessonsInCourse} from '../../selectors/lesson';
import {showLessonItemFlag} from '../../selectors/playlist';

const CourseItem = ({course, language, showLessonCount, lessonCount, coursePath, showExternalCourseFlags, t}) => {
  const courseTitle = getCourseTitle(course, language);
  const {external:externalLink} = getCourseFrontmatter(course, language);
  const popoverContent = getCourseIntro(course, language);
  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
    </PopoverComponent>
    : null;
  return (
    <div>
      {externalLink ?
        <a className={styles.courseItem} href={externalLink} target='_blank'>
          <img className={styles.courseLogo} src={getCourseIcon(course)}/>
          <span className={styles.courseName}>
            {courseTitle}
            {popoverButton}
            <Glyphicon className={styles.externalGlyph} glyph='new-window'/>
          </span>
          {showExternalCourseFlags ?
            <span>
              <Flag language={language}/>
            </span>:
            null
          }
        </a>
        :
        <Link className={styles.courseItem} to={coursePath}>
          <img className={styles.courseLogo} src={getCourseIcon(course)}/>
          <span className={styles.courseName}>{courseTitle}{popoverButton}</span>
          {showLessonCount ?
            <span className={styles.lessonCount}>{t('frontpage.lessoncount', {count: lessonCount})}</span> :
            null
          }
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
  lessonCount: PropTypes.number,
  coursePath: PropTypes.string,
  showExternalCourseFlags: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {course}) => {
  const showLessonCount = getShowFiltergroups(state);
  return {
    showLessonCount,
    lessonCount: showLessonCount ? getFilteredLessonsInCourse(state, course).length : null,
    coursePath: getLanguageIndependentCoursePath(course),
    showExternalCourseFlags: showLessonItemFlag(state),
    t: getTranslator(state),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(CourseItem));
