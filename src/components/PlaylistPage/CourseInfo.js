import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getCourseInfo} from '../../util';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseInfo.scss';

const CourseInfo = React.createClass({
  render() {
    const {t} = this.props;
    const courseName = this.props.courseName;
    const courseInfo = getCourseInfo(courseName);
    return (      
      <div className={this.props.isStudentMode ? styles.containerStudent : styles.containerTeacher}>
        {courseInfo ?
          <div dangerouslySetInnerHTML={{__html: courseInfo}} />
        :
        <h4>{t('playlist.courseinfonotfound')}</h4>
        }
      </div>
    );
  }
});

CourseInfo.propTypes = {
  isStudentMode: PropTypes.bool,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state)
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CourseInfo));
