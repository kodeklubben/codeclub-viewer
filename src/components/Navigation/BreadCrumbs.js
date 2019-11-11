import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Breadcrumbs, Button, Hidden, IconButton} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LevelIcon from '../LevelIcon';
import {getTranslator} from '../../selectors/translate';
import {getLanguageIndependentCoursePath} from '../../resources/courses';
import {getCourseTitle} from '../../resources/courseFrontmatter';
import {getLanguageAndIsReadme, getLessonTitle, getLessonPath} from '../../resources/lessonFrontmatter';
import {getCourseIcon} from '../../resources/courseIcon';
import {getLevel} from '../../resources/lessons';

const BreadCrumbs = ({course, lesson, file}) => {
  const courseLanguage = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));
  const showDarkMode = useSelector(state => state.showDarkMode);

  const isLesson = !!lesson;
  const isCourse = course && !isLesson;
  const {language:lessonLanguage, isReadme} = isLesson ? getLanguageAndIsReadme(course, lesson, file) || {} : {};
  const lessonTitle = getLessonTitle(course, lesson, lessonLanguage, isReadme);
  const lessonPath = getLessonPath(course, lesson, lessonLanguage, isReadme);
  const courseTitle = getCourseTitle(course, courseLanguage);
  const coursePath = isCourse || isLesson ? getLanguageIndependentCoursePath(course) : '';

  const CourseImg = ({width}) => <img
    {...{width}}
    height='auto'
    src={getCourseIcon(course, showDarkMode ? 'white' : 'black')}
    alt={t('general.picture', {title: courseTitle})}
  />;

  return (
    <Breadcrumbs separator={<NavigateNextIcon color='primary' fontSize='small'/>}>
      <IconButton size='small' component={RouterLink} to='/' aria-label={t('general.home')}>
        <HomeIcon color='primary'/>
      </IconButton>
      {coursePath ?
        <div>
          <Hidden xsDown>
            <Button color='primary' size='small' component={RouterLink} to={coursePath} startIcon={
              <CourseImg width={16}/>
            }>
              {courseTitle}
            </Button>
          </Hidden>
          <Hidden smUp>
            <IconButton size='small' component={RouterLink} to={coursePath}>
              <CourseImg width={22}/>
            </IconButton>
          </Hidden>
        </div>
        : null}
      {isLesson ?
        <div>
          <Hidden xsDown>
            <Button color='primary' size='small' component={RouterLink} to={lessonPath} startIcon={
              <LevelIcon level={getLevel(course, lesson)}/>
            }>
              {lessonTitle}
            </Button>
          </Hidden>
          <Hidden smUp>
            <IconButton size='small' component={RouterLink} to={lessonPath}>
              <LevelIcon level={getLevel(course, lesson)}/>
            </IconButton>
          </Hidden>
        </div>
        : null}
    </Breadcrumbs>
  );
};

BreadCrumbs.propTypes = {
  course: PropTypes.string,
  lesson: PropTypes.string,
  file: PropTypes.string,
};

export default BreadCrumbs;
