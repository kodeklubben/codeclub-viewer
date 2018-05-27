import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getLessonIntro} from '../../util';
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';
import PopoverComponent from '../PopoverComponent';
import {getShowFiltergroups} from '../../selectors/playlist';

const CourseItem = ({course, t, language, showLessonCount}) => {
  const isExternal = course.hasOwnProperty('externalLink');
  const coursePath = course.name.replace(/ /g, '_').toLowerCase();
  const introPath = coursePath + '/index' + (isExternal || language === 'nb' ? '' : ('_' + language));
  const popoverContent = getLessonIntro(introPath); // TODO: args=course,lesson,language,isReadme
  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
    </PopoverComponent>
    : null;
  return (
    <div>
      {isExternal ?
        <a className={styles.courseItem} href={course.externalLink} target='_blank'>
          <img className={styles.courseLogo} src={course.iconPath}/>
          <span className={styles.courseName}>{course.name}
            {popoverButton}
            <Glyphicon className={styles.externalGlyph} glyph='new-window'/>
          </span>
        </a>
        :
        <Link className={styles.courseItem} to={course.path}>
          <img className={styles.courseLogo} src={course.iconPath}/>
          <span className={styles.courseName}>{course.name}
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
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    externalLink: PropTypes.string,
    iconPath: PropTypes.string,
    lessonCount: PropTypes.int
  }),

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
