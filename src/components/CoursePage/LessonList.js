import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {List, ListItem, ListItemText, ListItemIcon, Paper} from '@material-ui/core';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseForLevel} from '../../selectors/lesson';
import {isLessonIndexed} from '../../resources/lessons';
import LevelIcon from '../LevelIcon';
import LessonWrapper from './LessonWrapper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: theme.typography.h5.fontSize,
  },
}));

const LessonList = ({level, course}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const lessonsInLevel = useSelector(state => getFilteredLessonsInCourseForLevel(state, course, level));

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <LevelIcon {...{level}} fontSize='large'/>
        </ListItemIcon>
        <ListItemText
          classes={{primary: classes.text}}
          primary={t('general.levels.' + level) + ' - ' + t('general.level') + ' ' + level}
        />
      </ListItem>
      <Paper>
        <List>
          {lessonsInLevel.map(lesson => 
            isLessonIndexed(course, lesson) ?
              <LessonWrapper key={lesson} {...{course, lesson}}/>
              : null
          )}
        </List>
      </Paper>
    </List>
  );
};

LessonList.propTypes = {
  level: PropTypes.number.isRequired,
  course: PropTypes.string.isRequired,
};

export default LessonList;
