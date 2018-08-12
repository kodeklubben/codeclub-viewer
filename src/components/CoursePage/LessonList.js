import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import LevelIcon from '../LevelIcon';
import LessonWrapper from './LessonWrapper';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseForLevel} from '../../selectors/lesson';
import {isLessonIndexed} from '../../resources/lessons';

const LessonList = ({course, level, lessonsInLevel, t}) => {
  return (
    <div>
      <Typography variant='title'>
        <LevelIcon {...{level}}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
      </Typography>
      <List>
        {lessonsInLevel.map(lesson =>
          isLessonIndexed(course, lesson) ?
            <li key={lesson}>
              <LessonWrapper {...{course, lesson}}/>
            </li>
            : null
        )}
      </List>
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

export default connect(
  mapStateToProps
)(LessonList);
