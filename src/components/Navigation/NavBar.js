import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar, Grid, Breadcrumbs, Drawer, IconButton, Link, List, Toolbar, Divider, Typography
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LevelIcon from '../LevelIcon';
import ContinueButton from './ContinueButton';
import DyslexiaSwitch from './DyslexiaSwitch';
import DarkModeSwitch from './DarkModeSwitch';
import {getTranslator} from '../../selectors/translate';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import {getLanguageAndIsReadme, getLessonTitle, getLessonPath} from '../../resources/lessonFrontmatter';
import {getCourseIcon} from '../../resources/courseIcon';
import {getLevel} from '../../resources/lessons';
import LanguageList from './LanguageList';
import ModeList from './ModeList';
import GithubLink from './GithubLink';

const useStyles = makeStyles(theme => ({
  hide: {
    '@media print': {
      display: 'none',
    },
  },
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  link: {
    display: 'flex',
  },
  homeIcon: {
    width: 20,
    height: 20,
  },
  icon : {
    marginRight: theme.spacing(1),
    width: 16,
    height: 'auto',
    alignSelf: 'center',
  },
  lessonMargin: {
    marginLeft: theme.spacing(1),
  },
}));

const NavBar = ({params}) => {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = React.useState(false);

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowDrawer(!showDrawer);
  };

  const courseLanguage = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));
  const showDarkMode = useSelector(state => state.showDarkMode);

  const {course, lesson, file} = params;
  const isLesson = !!lesson;
  const isCourse = course && !isLesson;
  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const lessonTitle = getLessonTitle(course, lesson, lessonLanguage, isReadme);
  const lessonPath = getLessonPath(course, lesson, lessonLanguage, isReadme);
  const courseTitle = getCourseTitle(course, courseLanguage);
  const coursePath = isCourse || isLesson ? getLanguageIndependentCoursePath(course) : '';

  const courseCrumb = (
    <Link
      color='textPrimary'
      underline='none'
      component={RouterLink}
      className={classes.link}
      to={coursePath}
    >
      <img
        className={classes.icon}
        src={getCourseIcon(course, showDarkMode ? 'white' : 'black')}
        alt={t('general.picture', {title: courseTitle})}
      />
      <Typography>{courseTitle}</Typography>
    </Link>
  );

  const lessonCrumb = (
    <Link
      color='textPrimary'
      underline='none'
      component={RouterLink}
      className={classes.link}
      aria-label={lessonTitle}
      to={lessonPath}
    >
      <Grid container alignItems='center'>
        <LevelIcon level={getLevel(course, lesson)} fontSize='inherit'/>
        <Typography className={classes.lessonMargin}>{lessonTitle}</Typography>
      </Grid>
    </Link>
  );

  return (
    <AppBar color='inherit' className={classes.hide}>
      <Toolbar className={classes.root}> 
        <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
          <Link
            color='textPrimary'
            component={RouterLink}
            aria-label={t('general.home')}
            className={classes.link}
            to={'/'}
          >
            <HomeIcon className={classes.homeIcon}/>
          </Link>
          {coursePath ? courseCrumb : null}
          {isLesson ? lessonCrumb : null}
        </Breadcrumbs>
        <ContinueButton {...{course}}/>
        <IconButton onClick={toggleDrawer()} aria-label='menu'>
          <MenuIcon/>
        </IconButton>
        <Drawer open={showDrawer} anchor='right' onClose={toggleDrawer()}>
          <List>
            <LanguageList/>
            <Divider/>
            <ModeList/>
            <Divider/>
            <DyslexiaSwitch/>
            <Divider/>
            <DarkModeSwitch/>
            <Divider/>
            <GithubLink/>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  }),
};

export default NavBar;
