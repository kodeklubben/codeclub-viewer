import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Breadcrumbs, Drawer, IconButton, Link, List, Toolbar, Divider} from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  courseIcon : {
    marginRight: theme.spacing(0.5),
    width: '15px',
    height: 'auto',
    alignSelf: 'center',
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

  const {course, lesson, file} = params;
  const isLesson = !!lesson;
  const isCourse = course && !isLesson;
  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const lessonTitle = getLessonTitle(course, lesson, lessonLanguage, isReadme);
  const lessonPath = getLessonPath(course, lesson, lessonLanguage, isReadme);
  const courseTitle = getCourseTitle(course, courseLanguage);
  const coursePath = isCourse || isLesson ? getLanguageIndependentCoursePath(course) : '';

  const courseCrumb = (
    <Link component={RouterLink} className={classes.link} color='primary' to={coursePath}>
      <img className={classes.courseIcon} src={getCourseIcon(course)} alt={t('general.picture', {title: courseTitle})}/>
      {courseTitle}
    </Link>
  );

  const lessonCrumb = (
    <Link component={RouterLink} className={classes.link} aria-label={lessonTitle} color='primary' to={lessonPath}>
      <LevelIcon level={getLevel(course, lesson)}/>
      {lessonTitle}
    </Link>
  );

  return (
    <AppBar color='inherit'>
      <Toolbar className={classes.root} >
        <Breadcrumbs separator={<NavigateNextIcon color='primary' fontSize='small'/>}>
          <Link component={RouterLink} aria-label={t('general.home')} className={classes.link} color='primary' to={'/'}>
            <HomeIcon className={classes.icon}/>
          </Link>
          {coursePath ? courseCrumb : null}
          {isLesson ? lessonCrumb : null}
        </Breadcrumbs>
        <ContinueButton {...{course}}/>
        <IconButton onClick={toggleDrawer()} color='primary' aria-label='menu'>
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
