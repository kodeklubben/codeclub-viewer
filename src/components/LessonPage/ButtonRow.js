import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {anyCheckboxTrue, createCheckboxesKey} from '../../utils/checkboxUtils';
import MainLanguageButton from './MainLanguageButton';
import ResetButton from './ResetButton';
import DarkModeButton from './DarkModeButton';
import InstructionButton from '../InstructionButton';
import PdfButton from './PdfButton';
import {getLessonPath} from '../../resources/lessonFrontmatter';


const ButtonRow = ({
  course, lesson, language, isReadme,
  path,
  mainLanguage, isStudentMode, anyCheckedCheckboxes,
}) => {
  const mainLanguageButton = language !== mainLanguage ?
    <MainLanguageButton {...{course, lesson, isReadme}}/> : null;

  const resetButton = anyCheckedCheckboxes ?
    <ResetButton {...{path}}/> : null;

  const lessonOrReadmeButton = isReadme || !isStudentMode ?
    <InstructionButton {...{course, lesson, language, isReadme: !isReadme}}/> : null;

  return (
    <div>
      <DarkModeButton/>
      {mainLanguageButton}
      {resetButton}
      {lessonOrReadmeButton}
      {<PdfButton {...{course, lesson, language, isReadme}}/>}
    </div>
  );
};

ButtonRow.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  path: PropTypes.string.isRequired,
  mainLanguage: PropTypes.string.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  anyCheckedCheckboxes: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => {
  const path = getLessonPath(course, lesson, language, isReadme);
  return {
    path,
    mainLanguage: state.language,
    isStudentMode: state.isStudentMode,
    anyCheckedCheckboxes: anyCheckboxTrue(state.checkboxes[createCheckboxesKey(path)] || {}),
  };
};

export default connect(
  mapStateToProps,
)(ButtonRow);
