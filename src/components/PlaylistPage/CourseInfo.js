import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getCourseInfoMarkup} from '../../util';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseInfo.scss';

const CourseInfo = React.createClass({
  render() {
    const {t, isStudentMode, courseInfo} = this.props;
    return (
      <div className={isStudentMode ? styles.containerStudent : styles.containerTeacher}>
        {courseInfo ?
          <div dangerouslySetInnerHTML={courseInfo} />
        :
          <h4>{t('playlist.courseinfonotfound')}</h4>
        }
      </div>
    );
  }
});

CourseInfo.propTypes = {
  isStudentMode: PropTypes.bool,
  t: PropTypes.func,
  courseName: PropTypes.string
};

function mapStateToProps(state, props) {
  return {
    t: getTranslator(state),
    courseInfo: getCourseInfoMarkup(props.courseName, state.language)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(CourseInfo));
