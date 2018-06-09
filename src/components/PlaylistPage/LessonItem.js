import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import LevelIcon from '../LevelIcon';
import PopoverComponent from '../PopoverComponent';
import InstructionButton from '../InstructionButton';
import {createCheckboxesKey} from '../../util';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';
import {getLessonLevel} from '../../resources/lessonData';
import {getLessonIntro} from '../../resources/lessonContent';
import {getTranslator} from '../../selectors/translate';
import {showLessonItemFlag} from '../../selectors/playlist';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../selectors/checkboxes';
import styles from './LessonItem.scss';


const Progress = ({checkedCheckboxes, totalCheckboxes}) => {
  return checkedCheckboxes > 0 ?
    <div className={styles.progress}>
      {`(${checkedCheckboxes}/${totalCheckboxes})`}
    </div> :
    null;
};

const Progressbar = ({checkedCheckboxes, totalCheckboxes, level}) => {
  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  return level > 0 ?
    <span className={styles['progressBarLevel' + level]} style={{width: progressPercent + '%'}}/> :
    null;
};

const LessonItem = ({
  language,
  title,
  level,
  url,
  external,
  readmeUrl,
  popoverContent,
  isStudentMode,
  showLessonItemFlag,
  t,
  checkedCheckboxes,
  totalCheckboxes
}) => {
  const flag = showLessonItemFlag ?
    <img className={styles.flag} src={require(`../../assets/graphics/flag_${language}.svg`)}/> : null;

  const instructionButton = isStudentMode ? null :
    <InstructionButton
      className={styles.instructionButton}
      buttonPath={readmeUrl}
      bsSize='xs'
      insideLink={true}
    />;

  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
    </PopoverComponent>
    : null;

  return (
    <div>
      {external ?
        <ListGroupItem href={external} target="_blank" className={styles.row}>
          {flag}
          <LevelIcon level={level}/>
          <div className={styles.title}>{title}</div>
          <Glyphicon glyph="new-window"/>
          <span className={styles.rightSide}>
            {instructionButton}
            {popoverButton}
          </span>
        </ListGroupItem>
        :
        <LinkContainer to={url}>
          <ListGroupItem className={styles.row}>
            {flag}
            <Progressbar {...{checkedCheckboxes, totalCheckboxes, level}}/>
            <LevelIcon level={level}/>
            <div className={styles.title}>{title}</div>
            <Progress {...{checkedCheckboxes, totalCheckboxes}}/>
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
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,

  // mapStateToProps
  title: PropTypes.string.isRequired,
  level: PropTypes.number,
  url: PropTypes.string.isRequired,
  external: PropTypes.string,
  readmeUrl: PropTypes.string.isRequired,
  popoverContent: PropTypes.string,
  isStudentMode: PropTypes.bool.isRequired,
  showLessonItemFlag: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
};

const mapStateToProps = (state, {course, lesson, language}) => {
  const {title, url, external} = getLessonFrontmatter(course, lesson, language, false);
  return {
    title,
    level: getLessonLevel(course, lesson),
    url,
    external,
    readmeUrl: getLessonFrontmatter(course, lesson, language, true).url,
    popoverContent: getLessonIntro(course, lesson, language, false),
    isStudentMode: state.isStudentMode,
    showLessonItemFlag: showLessonItemFlag(state),
    t: getTranslator(state),
    checkedCheckboxes: getNumberOfCheckedCheckboxes(state, createCheckboxesKey(lesson.path)),
    totalCheckboxes: getTotalNumberOfCheckboxes(state, createCheckboxesKey(lesson.path)),
  };
};



export default connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
