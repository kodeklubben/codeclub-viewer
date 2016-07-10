import React, {PropTypes} from 'react';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const CourseItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  onClick(path) {
    this.context.router.push(path);
  },
  render() {
    const course = this.props.course;
    const isExternal = course.hasOwnProperty('externalLink');
    return (
      <div>
        {isExternal ?
          <a className={styles.courseItem} href={course.externalLink}>
            <img className={styles.courseLogo} src={course.iconPath}/>
            <span className={styles.courseName}>{course.name}</span>
          </a>
          :
          <div className={styles.courseItem} onClick={this.onClick.bind(null, course.path)}>
            <img className={styles.courseLogo} src={course.iconPath}/>
            <span className={styles.courseName}>{course.name}</span>
            <span className={styles.lessonCount}>Oppgaver: {course.lessons.length}</span>
          </div>
        }
      </div>
    );
  }
});

CourseItem.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    iconPath: PropTypes.string,
    lessons: PropTypes.array
  })
};

export default withStyles(styles)(CourseItem);
