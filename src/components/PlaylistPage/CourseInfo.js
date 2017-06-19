import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getCourseInfo} from '../../util';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CourseInfo.scss';

const CourseInfo = React.createClass({
  render() {
    const {t, language, courseName, isStudentMode} = this.props;
    const courseInfo = getCourseInfo(courseName, language);
    return (      
      <div className={isStudentMode ? styles.containerStudent : styles.containerTeacher}>
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
  t: PropTypes.func,
  language: PropTypes.string
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state),
    language: state.language
  };
}

export default connect(mapStateToProps)(withStyles(styles)(CourseInfo));
