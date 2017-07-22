import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import LevelIcon from '../LevelIcon';
import {getTranslator} from '../../selectors/translate';
import {getLessonIntro} from '../../util';

const percentObject = {};
const getCheckboxProgress = (path, checkboxes) => {
  let checkboxKeys = Object.keys(checkboxes);
  let trueCheckboxes = 0;
  let checkboxObject = {};
  let value = false;
  for (let i = 0; i < checkboxKeys.length; i++) {
    checkboxObject = checkboxes[checkboxKeys[i]];
    checkboxKeys[i] = checkboxKeys[i].replace('checkboxes_','/');
    if (checkboxKeys[i] === path) {
      for (let key in checkboxObject) {
        value = checkboxObject[key];
        if (value === true) {
          trueCheckboxes++;
        }
      }
      percentObject[path] = (trueCheckboxes/Object.keys(checkboxObject).length)*100;
      return '(' + trueCheckboxes + '/' + Object.keys(checkboxObject).length + ')';
    }
  }
};

const lessonColor = (level) => {
  if (level === 1) {
    return '#46cc46';
  }
  else if (level === 2) {

    return '#368BD8';
  }
  else if (level === 3) {
    return '#D63838';
  }
  else if (level === 4) {
    return '#333333';
  }
};

export const LessonItem = React.createClass({
  render() {
    const {t, lesson, isStudentMode, checkboxes} = this.props;
    const levelIcon = <LevelIcon level={lesson.level}/>;
    const progress = <div className={styles.progress}>
      {getCheckboxProgress(lesson.path, checkboxes)}</div>;
    const instructionBtn = !isStudentMode && lesson.readmePath ?
      <LinkContainer to={lesson.readmePath}>
        <Button componentClass="div" className={styles.instructionBtn} bsStyle="guide" bsSize="xs">
          {t('playlist.instructionbutton')}
        </Button>
      </LinkContainer>
      : null;
    const tooltipContent = getLessonIntro(lesson.path.slice(1));
    const createMarkup = () => {
      return {__html: tooltipContent};
    };
    const tooltip =
      <Tooltip className={styles.tooltip} id={lesson.title}>
        <div dangerouslySetInnerHTML={createMarkup()}/>
      </Tooltip>;
    return (
      <OverlayTrigger animation={true} delayShow={400} placement="bottom" overlay={tooltip}>
        {lesson.external ?
        <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
          {levelIcon}
          <div className={styles.title}>{lesson.title}</div>
          &nbsp;<Glyphicon glyph="new-window"/>
          {instructionBtn}
        </ListGroupItem>
        :
        <LinkContainer to={lesson.path}>
          <ListGroupItem className={styles.row}>
            <span className={styles.progressBar}
              style={{width: percentObject[lesson.path] + '%', backgroundColor: lessonColor(lesson.level)}}></span>
            {levelIcon}
            <div className={styles.title}>{lesson.title}</div>
            {progress}
            {instructionBtn}
          </ListGroupItem>
        </LinkContainer>}
      </OverlayTrigger>
    );
  }
});

LessonItem.propTypes = {
  lesson: PropTypes.object,
  isStudentMode: PropTypes.bool,
  t: PropTypes.func,
  checkboxes: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode,
    t: getTranslator(state),
    checkboxes: state.checkboxes
  };
}

export const LessonItemContainer = connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
