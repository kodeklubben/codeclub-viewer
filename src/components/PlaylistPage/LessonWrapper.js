import React from 'react';
import PropTypes from 'prop-types';
import LessonItem from './LessonItem';
import {connect} from 'react-redux';
import {getCheckedFilterLanguages} from '../../selectors/filter';
import {getLessonLanguages} from '../../resources/lessonFrontmatter';

// The LessonWrapper includes a LessonItem for each checked lesson.
// React might need us to group them in a div (unless we update to React 16)

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
