import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Flag from '../Flag';
import styles from './LessonCount.scss';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseCountPerLanguage} from '../../selectors/lesson';
import {onlyCheckedMainLanguage} from '../../selectors/filter';

const LessonCount = ({lessonsPerLanguage, showFlag, t, showDarkMode}) => {
  const totalNumberOfLessons = Object.keys(lessonsPerLanguage).reduce((sum, n) => sum + lessonsPerLanguage[n], 0);
  return (
    <div className={showDarkMode ? styles.containerWhite : styles.container}>
      <div className={styles.center}>{t('frontpage.lessoncount', {count: totalNumberOfLessons})}</div>
      {showFlag ?
        <div className={styles.center}>
          {Object.keys(lessonsPerLanguage).map(language =>
            <span key={language} className={styles.flag}>
              <Flag {...{language}}/>
            </span>)
          }
        </div> :
        null
      }
    </div>
  );
};

LessonCount.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,

  // mapStateToProps
  lessonsPerLanguage: PropTypes.objectOf(PropTypes.number),
  showFlag: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  showDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course}) => ({
  lessonsPerLanguage: getFilteredLessonsInCourseCountPerLanguage(state, course),
  showFlag: !onlyCheckedMainLanguage(state),
  t: getTranslator(state),
  showDarkMode: state.showDarkMode,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonCount));
