import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LevelIcon from '../LevelIcon';
import LessonWrapper from './LessonWrapper';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseForLevel} from '../../selectors/lesson';
import {isLessonIndexed} from '../../resources/lessons';

const LessonList = ({course, level, lessonsInLevel, t}) => {
  return (
    <div>
      <h2>
        <LevelIcon level={level}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
      </h2>
      <List>
        <Divider/>
        {lessonsInLevel.map(lesson =>
          isLessonIndexed(course, lesson) ?
            <div key={lesson}>
              <LessonWrapper {...{course, lesson}}/>
            </div>
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
