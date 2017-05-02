import React, {PropTypes} from 'react';
import {getCourseIndex} from '../../util';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseInfo.scss';

const CourseInfo = React.createClass({
  render() {
    const courseName = this.props.courseName;
    const indexfile = getCourseIndex(courseName);
    const indexfileLength = indexfile.content.toString().length;
    return (      
      <div className={this.props.isStudentMode ? styles.containerStudent : styles.containerTeacher}>
        {indexfileLength !== 0 ?
          <div dangerouslySetInnerHTML={{__html: indexfile.content}} />
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
