import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';

const CourseItem = ({course, t}) => {
  const isExternal = course.hasOwnProperty('externalLink');
  return (
    <div>
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
    </div>
  );
};

CourseItem.propTypes = {
  t: PropTypes.func,
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    externalLink: PropTypes.string,
    iconPath: PropTypes.string,
    lessonCount: PropTypes.int
  })
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(CourseItem));
