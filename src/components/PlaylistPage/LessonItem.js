import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import LevelIcon from '../LevelIcon';
import {getTranslator} from '../../selectors/translate';
import {getLessonIntro, createCheckboxesKey} from '../../util';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../selectors/checkboxes';
import TooltipComponent from '../TooltipComponent';

const LessonItem = ({t, lesson, isStudentMode, checkedCheckboxes, totalCheckboxes}) => {
  const levelIcon = <LevelIcon level={lesson.level}/>;

  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  const progress = checkedCheckboxes > 0 ?
    <div className={styles.progress}>
      {`(${checkedCheckboxes}/${totalCheckboxes})`}
    </div> :
    null;

  const instructionBtn = !isStudentMode && lesson.readmePath ?
    <LinkContainer to={lesson.readmePath}>
      <Button componentClass="div" className={styles.instructionBtn} bsStyle="guide" bsSize="xs">
        {t('playlist.instructionbutton')}
      </Button>
    </LinkContainer>
    : null;

  const tooltipContent = getLessonIntro(lesson.path.slice(1));

  const tooltipComponent =
    <TooltipComponent id={lesson.title} {...{tooltipContent}}>
      <Glyphicon className={styles.glyph + (isStudentMode ? ' ' + styles.marginFix : '')} glyph='info-sign'/>
    </TooltipComponent>;


  const progressBar = lesson.level > 0 ?
    <span className={styles['progressBarLevel' + lesson.level]} style={{width: progressPercent + '%'}}/> :
    null;

  return (
    <div>
      {lesson.external ?
      <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
        {levelIcon}
        <div className={styles.title}>{lesson.title}</div>
        &nbsp;<Glyphicon glyph="new-window"/>
        {instructionBtn}
        {tooltipComponent}
      </ListGroupItem>
      :
      <LinkContainer to={lesson.path}>
        <ListGroupItem className={styles.row}>
          {progressBar}
          {levelIcon}
          <div className={styles.title}>{lesson.title}</div>
          {progress}
          {instructionBtn}
          {tooltipComponent}
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
