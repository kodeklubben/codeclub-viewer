import React from 'react';
import PropTypes from 'prop-types';
import LessonItem from './LessonItem';
import {useSelector} from 'react-redux';
import {getCheckedFilterLanguages} from '../../selectors/filter';
import {getLessonLanguages} from '../../resources/lessonFrontmatter';

const LessonWrapper = ({course, lesson}) => {
  const checkedFilteredLanguages = useSelector(state => getCheckedFilterLanguages(state));

  const lessonLanguages = getLessonLanguages(course, lesson);
  const checkedLessonLanguages = lessonLanguages.filter(language => checkedFilteredLanguages.includes(language));

  return checkedLessonLanguages.map(language => <LessonItem key={language} {...{course, lesson, language}}/>);
};

LessonWrapper.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
};

export default LessonWrapper;
