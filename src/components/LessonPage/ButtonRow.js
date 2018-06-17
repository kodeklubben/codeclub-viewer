import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ButtonRow.scss';
import {anyCheckboxTrue, createCheckboxesKey} from '../../util';
import MainLanguageButton from './MainLanguageButton';
import ResetButton from './ResetButton';
import InstructionButton from '../InstructionButton';
import PdfButton from './PdfButton';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';


const ButtonRow = ({path, pdfPath, mainLanguagePath, isReadme, isStudentMode, anyCheckedCheckboxes}) => (
  <div className={styles.container}>
    {mainLanguagePath ? <MainLanguageButton path={mainLanguagePath}/> : null}
    {anyCheckedCheckboxes ? <ResetButton {...{path}}/> : null}
    {(isReadme || !isStudentMode) ? <InstructionButton {...{path, isReadme}}/> : null}
    {<PdfButton href={pdfPath}/>}
  </div>
);

ButtonRow.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  path: PropTypes.string.isRequired,
  pdfPath: PropTypes.string.isRequired,
  mainLanguagePath: PropTypes.string,
  isStudentMode: PropTypes.bool.isRequired,
  anyCheckedCheckboxes: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => {
  const {path, pdfPath} = getLessonFrontmatter(course, lesson, language, isReadme);
  return {
    path,
    pdfPath,
    mainLanguagePath: getLessonFrontmatter(course, lesson, state.language, isReadme).path,
    isStudentMode: state.isStudentMode,
    anyCheckedCheckboxes: anyCheckboxTrue(state.checkboxes[createCheckboxesKey(path)] || {}),
  };
};

export default connect(
  mapStateToProps,
)(withStyles(styles)(ButtonRow));
