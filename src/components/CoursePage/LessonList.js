import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import useStyles from 'isomorphic-style-loader/useStyles';
import LevelIcon from '../LevelIcon';
import LessonWrapper from './LessonWrapper';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseForLevel} from '../../selectors/lesson';
import {isLessonIndexed} from '../../resources/lessons';
import styles from './LessonList.scss';

export const lessonListId = (level) => 'lessonlist-level-' + level;

const LessonList = ({course, level, lessonsInLevel, t}) => {
  useStyles(styles);
  return (
    <div className={styles.list}>
      <h2 className={styles.headerText} id={lessonListId(level)}>
        <LevelIcon level={level}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
      </h2>
      <ListGroup>
        {lessonsInLevel.map(lesson =>
          isLessonIndexed(course, lesson) ?
            <LessonWrapper key={lesson} {...{course, lesson}}/>
            : null
        )}
      </ListGroup>
    </div>
  );
};

LessonList.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,

  // mapStateToProps
  lessonsInLevel: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {course, level}) => ({
  lessonsInLevel: getFilteredLessonsInCourseForLevel(state, course, level),
  t: getTranslator(state)
});

export default connect(mapStateToProps)(LessonList);
