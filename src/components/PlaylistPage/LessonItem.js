import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import LevelIcon from '../LevelIcon';
import {getTranslator} from '../../selectors/translate';
import {getLessonIntro, createCheckboxesKey} from '../../util';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../selectors/checkboxes';
import TooltipComponent from '../TooltipComponent';
import InstructionButton from '../InstructionButton';

const LessonItem = ({t, lesson, isStudentMode, checkedCheckboxes, totalCheckboxes}) => {
  const levelIcon = <LevelIcon level={lesson.level}/>;

  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  const progress = checkedCheckboxes > 0 ?
    <div className={styles.progress}>
      {`(${checkedCheckboxes}/${totalCheckboxes})`}
    </div> :
    null;

  const instructionButton = !isStudentMode ? <InstructionButton className={styles.instructionBtn}
    buttonPath={lesson.readmePath} buttonText={t('playlist.instructionbutton')} bsSize='xs'/>
    : null;

  const tooltipContent = getLessonIntro(lesson.path.slice(1));

  const tooltipButton = tooltipContent ?
    <TooltipComponent {...{tooltipContent}}>
      <Glyphicon className={styles.glyph +
        ((lesson.readmePath && !isStudentMode) ? ' ' + styles.marginLeft : '')} glyph='info-sign'/>
    </TooltipComponent>
    : null;

  const progressBar = lesson.level > 0 ?
    <span className={styles['progressBarLevel' + lesson.level]} style={{width: progressPercent + '%'}}/> :
    null;

  const title = <div className={styles.title}>{lesson.title}</div>;

  const externalIcon = <Glyphicon className={styles.externalGlyph +
    ((lesson.readmePath && !isStudentMode) ? ' ' + styles.marginLeft : '')} glyph="new-window"/>;

  return (
    <div>
      {lesson.external ?
      <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
        {levelIcon}
        {title}
        {instructionButton}
        {tooltipButton}
        {externalIcon}
      </ListGroupItem>
      :
      <LinkContainer to={lesson.path}>
        <ListGroupItem className={styles.row}>
          {progressBar}
          {levelIcon}
          {title}
          {progress}
          {instructionButton}
          {tooltipButton}
        </ListGroupItem>
      </LinkContainer>}
    </div>
  );
};

LessonItem.propTypes = {
  // ownProps
  lesson: PropTypes.object,

  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
};

const mapStateToProps = (state, {lesson}) => ({
  isStudentMode: state.isStudentMode,
  t: getTranslator(state),
  checkedCheckboxes: getNumberOfCheckedCheckboxes(state, createCheckboxesKey(lesson.path)),
  totalCheckboxes: getTotalNumberOfCheckboxes(state, createCheckboxesKey(lesson.path)),
});


export default connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
