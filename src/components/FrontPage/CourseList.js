import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {
  Card, CardActionArea, CardContent, CardMedia, Typography, Link, CardHeader, Grid, Collapse, ListItem, ListItemText
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getShowFiltergroups} from '../../selectors/playlist';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import LessonCount from './LessonCount';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 250,
  },
  image: {
    maxHeight: 120,
    width: 'auto',
    marginBottom: theme.spacing(1),
  },
}));

const CourseList = ({course}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = event => {
    event.stopPropagation();
    event.preventDefault();
    setOpen(!open);
  };

  const showLessonCount = useSelector(state => getShowFiltergroups(state));
  const language = useSelector(state => state.language);
  const showDarkMode = useSelector(state => state.showDarkMode);

  return (
    <Grid item>
      <Link
        color='inherit'
        underline='none'
        component={RouterLink}
        to={getLanguageIndependentCoursePath(course)}
      >
        <Card className={classes.card}>
          <CardActionArea> 
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
          </CardActionArea>
          <ListItem button divider={open} onClick={handleOpen}>
            <ListItemText primary={showLessonCount ? <LessonCount {...{course}}/> : null}/>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography variant='body2' component='div'>
                <div dangerouslySetInnerHTML={{__html: getCourseIntro(course, language)}}/>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Link>
    </Grid>
  );
};

CourseList.propTypes = {
  course: PropTypes.string,
};

export default CourseList;
