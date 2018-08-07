import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import LevelIcon from '../LevelIcon';
import LessonWrapper from './LessonWrapper';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseForLevel} from '../../selectors/lesson';
import {isLessonIndexed} from '../../resources/lessons';

const styles = {
  headerText: {
    fontSize: '1.75em',
  },
};

const LessonList = ({classes, course, level, lessonsInLevel, t}) => {
  return (
    <div>
      <h2 className={classes.headerText}>
        <LevelIcon level={level}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
      </h2>
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
  classes: PropTypes.object.isRequired,
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
)(withStyles(styles)(LessonList));
