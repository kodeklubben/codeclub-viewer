import React, {PropTypes} from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseInfo.scss';

import {getCourseIndex} from '../../util';
import {getInfo} from '../../util';

const CourseInfo = React.createClass({

  render() {
    const courseName = this.props.courseName;
    const indexfile = getCourseIndex(courseName);
    return (
      <div>
        <div className={styles.container}>
          <div dangerouslySetInnerHTML={{__html: indexfile.content}} />
        </div>
      </div>
    );
  }
});

CourseInfo.propTypes = {
  isStudentMode: PropTypes.bool
};

export default (withStyles(styles)(CourseInfo));
