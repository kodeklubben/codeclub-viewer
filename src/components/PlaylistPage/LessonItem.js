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
import PopoverComponent from '../PopoverComponent';

const LessonItem = ({t, lesson,checkedCheckboxes, totalCheckboxes}) => {
  const levelIcon = <LevelIcon level={lesson.level}/>;

  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  const progress = checkedCheckboxes > 0 ?
    <div className={styles.progress}>
      {`(${checkedCheckboxes}/${totalCheckboxes})`}
    </div> :
    null;

  const popoverContent = getLessonIntro(lesson.path.slice(1));

  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
    </PopoverComponent>
    : null;

  const progressBar = lesson.level > 0 ?
    <span className={styles['progressBarLevel' + lesson.level]} style={{width: progressPercent + '%'}}/> :
    null;

  const title = <div className={styles.title}>{lesson.title}</div>;

  const externalIcon = <Glyphicon className={styles.externalGlyph} glyph="new-window"/>;

  return (
    <div>
      {lesson.external ?
        <ListGroupItem href={lesson.external} target="_blank" className={styles.row}>
          {levelIcon}
          {title}
          {popoverButton}
          {externalIcon}
        </ListGroupItem>
        :
        <LinkContainer to={lesson.path}>
          <ListGroupItem className={styles.row}>
            {progressBar}
            {levelIcon}
            {title}
            {progress}
            {popoverButton}
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
  t: PropTypes.func.isRequired,
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
};

const mapStateToProps = (state, {lesson}) => ({
  t: getTranslator(state),
  checkedCheckboxes: getNumberOfCheckedCheckboxes(state, createCheckboxesKey(lesson.path)),
  totalCheckboxes: getTotalNumberOfCheckboxes(state, createCheckboxesKey(lesson.path)),
});


export default connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
