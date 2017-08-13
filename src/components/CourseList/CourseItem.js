import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getLessonIntro} from '../../util';
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';
import TooltipComponent from '../TooltipComponent';

const CourseItem = ({course, t, language}) => {
  const isExternal = course.hasOwnProperty('externalLink');

  const coursePath = course.name.replace(/ /g, '_').toLowerCase();
  const tooltipContent = isExternal ? getLessonIntro(coursePath + '/index') :
    getLessonIntro(coursePath + '/index' + (language === 'nb' ? '' : ('_' + language)));

  return (
    <TooltipComponent id={course.name} tooltipContent={tooltipContent}>
      {isExternal ?
        <a className={styles.courseItem} href={course.externalLink} target='_blank'>
          <img className={styles.courseLogo} src={course.iconPath}/>
          <span className={styles.courseName}>{course.name} <Glyphicon glyph='new-window'/></span>
        </a>
        :
        <Link className={styles.courseItem} to={course.path}>
          <img className={styles.courseLogo} src={course.iconPath}/>
          <span className={styles.courseName}>{course.name}</span>
          <span className={styles.lessonCount}>{t('playlist.lessons')}: {course.lessonCount}</span>
        </Link>
      }
    </TooltipComponent>
  );
};

CourseItem.propTypes = {
  t: PropTypes.func.isRequired,
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    externalLink: PropTypes.string,
    iconPath: PropTypes.string,
    lessonCount: PropTypes.int
  }),
  language: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  language: state.language
});

export default connect(mapStateToProps)(withStyles(styles)(CourseItem));
