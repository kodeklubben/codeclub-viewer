import React, {PropTypes} from 'react';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {Link} from 'react-router';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const CourseItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    const course = this.props.course;
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
            <span className={styles.lessonCount}>Oppgaver: {course.lessonCount}</span>
          </Link>
        }
      </div>
    );
  }
});

CourseItem.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    externalLink: PropTypes.string,
    iconPath: PropTypes.string,
    lessonCount: PropTypes.int
  })
};

export default withStyles(styles)(CourseItem);
