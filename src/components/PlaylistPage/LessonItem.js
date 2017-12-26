import React from 'react';
import PropTypes from 'prop-types';
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
import PopoverComponent from '../PopoverComponent';
import InstructionButton from '../InstructionButton';

const LessonItem = ({t, lesson, isStudentMode, checkedCheckboxes, totalCheckboxes}) => {
  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  const progress = checkedCheckboxes > 0 ?
    <div className={styles.progress}>
      {`(${checkedCheckboxes}/${totalCheckboxes})`}
    </div> :
    null;
  const progressBar = lesson.level > 0 ?
    <span className={styles['progressBarLevel' + lesson.level]} style={{width: progressPercent + '%'}}/> :
    null;

  const instructionButton = isStudentMode ? null :
    <InstructionButton
      className={styles.instructionButton}
      buttonPath={lesson.readmePath}
      bsSize='xs'
      insideLink={true}
    />;

  const popoverContent = getLessonIntro(lesson.path.slice(1));
  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
    </PopoverComponent>
    : null;

  return (
    <div>
      {lesson.external ?
        <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
          <LevelIcon level={lesson.level}/>
          <div className={styles.title}>{lesson.title}</div>
          <Glyphicon glyph="new-window"/>
          <span className={styles.rightSide}>
            {instructionButton}
            {popoverButton}
          </span>
        </ListGroupItem>
        :
        <LinkContainer to={lesson.path}>
          <ListGroupItem className={styles.row}>
            {progressBar}
            <LevelIcon level={lesson.level}/>
            <div className={styles.title}>{lesson.title}</div>
            {progress}
            <span className={styles.rightSide}>
              {instructionButton}
              {popoverButton}
            </span>
          </ListGroupItem>
        </LinkContainer>
      }
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
