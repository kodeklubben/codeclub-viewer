import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import Flag from '../Flag';
import styles from './LessonCount.scss';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseCountPerLanguage} from '../../selectors/lesson';
import {onlyCheckedMainLanguage} from '../../selectors/filter';

const LessonCount = ({lessonsPerLanguage, showFlag, t}) => {
  useStyles(styles);
  const totalNumberOfLessons = Object.keys(lessonsPerLanguage).reduce((sum, n) => sum + lessonsPerLanguage[n], 0);
  return (
    <div className={styles.container}>
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
};

const mapStateToProps = (state, {course}) => ({
  lessonsPerLanguage: getFilteredLessonsInCourseCountPerLanguage(state, course),
  showFlag: !onlyCheckedMainLanguage(state),
  t: getTranslator(state),
});

export default connect(mapStateToProps)(LessonCount);
