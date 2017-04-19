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

    /*const indexfilepath = 'https://github.com/kodeklubben/oppgaver/tree/master/src/' + courseName + '/index.md'*/
    console.log(courseName);
    console.log(indexfile);

/*______________________________________________________________________________________________*/
    
    return (
      /*<Collapse in={!this.props.isStudentMode}>*/
        <div className={styles.container}>
          <div dangerouslySetInnerHTML={{__html: indexfile.content}} />
        </div>
      /*</Collapse>*/
    );
  }
});

CourseInfo.propTypes = {
  isStudentMode: PropTypes.bool
};

export default (withStyles(styles)(CourseInfo));
