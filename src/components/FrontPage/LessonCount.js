import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Typography} from '@material-ui/core';
import {getTranslator} from '../../selectors/translate';
import {getFilteredLessonsInCourseCountPerLanguage} from '../../selectors/lesson';

const LessonCount = ({course}) => {

  const lessonsPerLanguage = useSelector(state => getFilteredLessonsInCourseCountPerLanguage(state, course));
  const t = useSelector(state => getTranslator(state));

  const totalNumberOfLessons = Object.keys(lessonsPerLanguage).reduce((sum, n) => sum + lessonsPerLanguage[n], 0);

  return <Typography variant='caption'>{t('frontpage.lessoncount', {count: totalNumberOfLessons})}</Typography>;
};

LessonCount.propTypes = {
  course: PropTypes.string.isRequired,
};

export default LessonCount;
