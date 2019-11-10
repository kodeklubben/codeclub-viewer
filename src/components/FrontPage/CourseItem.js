import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Card, CardActionArea, CardMedia, CardHeader, Grid, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import {getShowFiltergroups} from '../../selectors/playlist';
import {onlyCheckedMainLanguage} from '../../selectors/filter';
import {getFilteredLessonsInCourseCountPerLanguage} from '../../selectors/lesson';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import LessonCount from './LessonCount';
import PopoverComponent from '../PopoverComponent';
import Flag from '../Flag';

const useStyles = makeStyles(theme => ({
  card: {
    width: 240,
  },
  image: {
    maxHeight: 120,
    width: 'auto',
    marginBottom: theme.spacing(1),
  },
}));

const CourseItem = ({course}) => {
  const classes = useStyles();

  const showLessonCount = useSelector(state => getShowFiltergroups(state));
  const language = useSelector(state => state.language);
  const showDarkMode = useSelector(state => state.showDarkMode);
  const lessonsPerLanguage = useSelector(state => getFilteredLessonsInCourseCountPerLanguage(state, course));
  const showFlag = useSelector(state => !onlyCheckedMainLanguage(state));

  return (
    <Card className={classes.card}>
      <CardActionArea component={RouterLink} to={getLanguageIndependentCoursePath(course)}> 
        <Grid container alignItems='center' direction='column'>
          <CardHeader title={getCourseTitle(course, language)}/>
          <CardMedia
            className={classes.image}
            component='img'
            alt={course}
            src={getCourseIcon(course, showDarkMode ? 'white' : 'black')}
            title={course}
          />
        </Grid>
        {showFlag ?
          <Grid container justify='center' spacing={1}>
            {Object.keys(lessonsPerLanguage).map(language =>
              <Grid item key={language}>
                <Flag {...{language}}/>
              </Grid>
            )}
          </Grid>
          : null}
      </CardActionArea>
      <Grid container alignItems='center' wrap='nowrap'>
        <ListItem>
          {showLessonCount ? <ListItemText primary={<LessonCount {...{course}}/>}/> : <ListIcon size='small'/>}
        </ListItem>
        <PopoverComponent popoverContent={getCourseIntro(course, language)}/>
      </Grid>
    </Card>
  );
};

CourseItem.propTypes = {
  course: PropTypes.string,
};

export default CourseItem;
