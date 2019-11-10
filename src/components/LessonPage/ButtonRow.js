import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {anyCheckboxTrue, createCheckboxesKey} from '../../utils/checkboxUtils';
import MainLanguageButton from './MainLanguageButton';
import ResetButton from './ResetButton';
import InstructionButton from '../InstructionButton';
import PdfButton from './PdfButton';
import {getLessonPath} from '../../resources/lessonFrontmatter';

const ButtonRow = ({course, lesson, language, isReadme,}) => {
  const path = getLessonPath(course, lesson, language, isReadme);
  const mainLanguage = useSelector(state => state.language);
  const isStudentMode = useSelector(state => state.isStudentMode);
  const anyCheckedCheckboxes = useSelector(state => anyCheckboxTrue(state.checkboxes[createCheckboxesKey(path)] || {}));

  const mainLanguageButton = language !== mainLanguage ?
    <MainLanguageButton {...{course, lesson, isReadme}}/> : null;

  const resetButton = anyCheckedCheckboxes ?
    <ResetButton {...{path}}/> : null;

  const lessonOrReadmeButton = isReadme || !isStudentMode ?
    <InstructionButton {...{course, lesson, language, isReadme: !isReadme}}/> : null;

  return (
    <React.Fragment>
      {mainLanguageButton}
      {resetButton}
      {lessonOrReadmeButton}
      <PdfButton {...{course, lesson, language, isReadme}}/>
    </React.Fragment>
  );
};

ButtonRow.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default ButtonRow;
