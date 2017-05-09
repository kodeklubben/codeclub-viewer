import React, {PropTypes} from 'react';
import {getCourseInfo} from '../../util';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseInfo.scss';

const CourseInfo = React.createClass({
  render() {
    const courseName = this.props.courseName;
    const courseInfo = getCourseInfo(courseName);
    return (      
      <div className={this.props.isStudentMode ? styles.containerStudent : styles.containerTeacher}>
        {courseInfo ?
          <div dangerouslySetInnerHTML={{__html: courseInfo}} />
        :
        <h4>Oops, her har noen glemt å skrive kursinformasjon!</h4>
        }
      </div>
    );
  }
});

CourseInfo.propTypes = {
  isStudentMode: PropTypes.bool
};

export default (withStyles(styles)(CourseInfo));
