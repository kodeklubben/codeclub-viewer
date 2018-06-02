import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';
import PopoverComponent from '../PopoverComponent';
import {getShowFiltergroups} from '../../selectors/playlist';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';

const CourseItem = ({course, t, language, showLessonCount}) => {
  const courseTitle = getCourseTitle(course, language);
  const isExternal = course.hasOwnProperty('externalLink');
  const popoverContent = getCourseIntro(course, language);
  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
    </PopoverComponent>
    : null;
  return (
    <div>
      {isExternal ?
        <a className={styles.courseItem} href={course.externalLink} target='_blank'>
          <img className={styles.courseLogo} src={getCourseIcon(course)}/>
          <span className={styles.courseName}>{courseTitle}
            {popoverButton}
            <Glyphicon className={styles.externalGlyph} glyph='new-window'/>
          </span>
        </a>
        :
        <Link className={styles.courseItem} to={course.path}>
          <img className={styles.courseLogo} src={getCourseIcon(course)}/>
          <span className={styles.courseName}>{courseTitle}
            {popoverButton}
          </span>
          {showLessonCount ?
            <span className={styles.lessonCount}>{t('playlist.lessons')}: {course.lessonCount}</span> :
            null
          }
        </Link>
      }
    </div>);
};

CourseItem.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  // course: PropTypes.shape({
  //   path: PropTypes.string,
  //   externalLink: PropTypes.string,
  //   iconPath: PropTypes.string,
  //   lessonCount: PropTypes.int
  // }),

  // mapStateToProps
  t: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  showLessonCount: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  language: state.language,
  showLessonCount: getShowFiltergroups(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(CourseItem));
