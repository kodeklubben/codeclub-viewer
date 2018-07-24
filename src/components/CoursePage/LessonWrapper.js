import React from 'react';
import PropTypes from 'prop-types';
import LessonItem from './LessonItem';
import {connect} from 'react-redux';
import {getCheckedFilterLanguages} from '../../selectors/filter';
import {getLessonLanguages} from '../../resources/lessonFrontmatter';

const LessonWrapper = ({course, lesson, checkedLessonLanguages}) =>
  checkedLessonLanguages.map(language =>
    <LessonItem key={language} {...{course, lesson, language}}/>
  );

LessonWrapper.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,

  // mapStateToProps
  checkedLessonLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state, {course, lesson}) => {
  const lessonLanguages = getLessonLanguages(course, lesson);
  const checkedFilteredLanguages = getCheckedFilterLanguages(state);
  const checkedLessonLanguages = lessonLanguages.filter(language => checkedFilteredLanguages.includes(language));
  return {
    checkedLessonLanguages,
  };
};

export default connect(
  mapStateToProps
)(LessonWrapper);
