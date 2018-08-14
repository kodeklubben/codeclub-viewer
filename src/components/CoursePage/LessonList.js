import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LevelIcon from '../LevelIcon';
import LessonWrapper from './LessonWrapper';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseForLevel} from '../../selectors/lesson';
import {isLessonIndexed} from '../../resources/lessons';

const styles = {
  container: {
    marginTop: 30,
  },
};

const LessonList = ({classes, course, level, lessonsInLevel, t, isStudentMode}) => {
  return (
    <div className={classes.container}>
      <Typography variant='headline'>
        <LevelIcon {...{level}}/>{t('general.levels.' + level)}{' - ' + t('general.level') + ' ' + level}
      </Typography>
      <List>
        <Divider/>
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
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course, level}) => ({
  lessonsInLevel: getFilteredLessonsInCourseForLevel(state, course, level),
  t: getTranslator(state),
  isStudentMode: state.isStudentMode,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonList));
