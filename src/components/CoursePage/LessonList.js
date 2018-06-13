import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LevelIcon from '../LevelIcon';
import LessonWrapper from './LessonWrapper';
import {getTranslator} from '../../selectors/translate';
import {getLessonsInLevel, isLessonIndexed} from '../../resources/lessonData';
import styles from './LessonList.scss';


const LessonList = ({course, level, lessonsInLevel, t}) => {
  return (
    <div className={styles.list}>
      <h3 id={'lessonlist-level-' + level}>
        <LevelIcon level={level}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
      </h3>
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
  level: PropTypes.string.isRequired,

  // mapStateToProps
  lessonsInLevel: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {course, level}) => ({
  lessonsInLevel: getLessonsInLevel(course, level),
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonList));
