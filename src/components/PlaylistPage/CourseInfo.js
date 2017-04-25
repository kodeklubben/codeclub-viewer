import React, {PropTypes} from 'react';
import {getCourseIndex} from '../../util';
import {getInfo} from '../../util';
import Collapse from 'react-bootstrap/lib/Collapse';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseInfo.scss';

const CourseInfo = React.createClass({

  render() {
    const courseName = this.props.courseName;
    const indexfile = getCourseIndex(courseName);
    return (      
      <div className={this.props.isStudentMode ? styles.containerStudent : styles.containerTeacher}>
        <div dangerouslySetInnerHTML={{__html: indexfile.content}} />
      </div>
    );
  }
});

CourseInfo.propTypes = {
  isStudentMode: PropTypes.bool
};

export default (withStyles(styles)(CourseInfo));
