import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LevelIcon from '../LevelIcon';
import PopoverComponent from '../PopoverComponent';
import InstructionButton from '../InstructionButton';
import Flag from '../Flag';
import {createCheckboxesKey} from '../../utils/checkboxUtils';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';
import {getLevel} from '../../resources/lessons';
import {getLessonIntro} from '../../resources/lessonContent';
import {getTranslator} from '../../selectors/translate';
import {onlyCheckedMainLanguage} from '../../selectors/filter';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../selectors/checkboxes';

const bar = {
  position: 'absolute',
  left: '0',
  bottom: '0',
  height: '10px',
};

const styles = {
  progressBarLevel1: {
    ...bar,
    'background-color': '#46cc46',
  },
  progressBarLevel2: {
    ...bar,
    'background-color': '#368bd8',
  },
  progressBarLevel3: {
    ...bar,
    'background-color': '#d63838',
  },
  progressBarLevel4: {
    ...bar,
    'background-color': '#333',
  },
  flag: {
    marginRight: '10px',
  },
};

const Progress = ({classes, checkedCheckboxes, totalCheckboxes}) => {
  return checkedCheckboxes > 0 ?
    <span>
      {`(${checkedCheckboxes}/${totalCheckboxes})`}
    </span> :
    null;
};

const Progressbar = ({classes, checkedCheckboxes, totalCheckboxes, level}) => {
  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  return level > 0 ?
    <span className={classes['progressBarLevel' + level]} style={{width: progressPercent + '%'}}/> :
    null;
};

const LessonItem = ({
  classes, course, lesson, language,
  title, path, external, popoverContent, isStudentMode, onlyCheckedMainLanguage,
  t, checkedCheckboxes, totalCheckboxes
}) => {
  const level = getLevel(course, lesson);

  const flag = onlyCheckedMainLanguage ? null :
    <div className={classes.flag}><Flag language={language}/></div>;

  const instructionButton = isStudentMode ? null :
    <InstructionButton {...{course, lesson, language, isReadme: true, onlyIcon: true, insideLink: true}} />;

  const popoverButton = popoverContent ? <PopoverComponent {...{popoverContent}}/> : null;

  const progress = <Progress {...{checkedCheckboxes, totalCheckboxes}}/>;

  return (
    <div>
      {external ?
        <ListItem component={Link} to={external} button target='_blank' rel='noopener'>
          {flag}
          <LevelIcon level={level}/>
          <ListItemText primary={title}/>
          <Glyphicon glyph='new-window'/>
          {instructionButton}
          {popoverButton}
        </ListItem>
        :
        <ListItem button component={Link} to={path}>
          {flag}
          <Progressbar {...{classes, checkedCheckboxes, totalCheckboxes, level}}/>
          <LevelIcon level={level}/>
          <ListItemText primary={title} secondary={progress}/>
          {instructionButton}
          {popoverButton}
        </ListItem>
      }
      <Divider/>
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
  path: PropTypes.string.isRequired,
  external: PropTypes.string,
  popoverContent: PropTypes.string,
  isStudentMode: PropTypes.bool.isRequired,
  onlyCheckedMainLanguage: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
};

const mapStateToProps = (state, {course, lesson, language}) => {
  const {title, path, external} = getLessonFrontmatter(course, lesson, language, false);
  return {
    title,
    path,
    external,
    popoverContent: getLessonIntro(course, lesson, language, false),
    isStudentMode: state.isStudentMode,
    onlyCheckedMainLanguage: onlyCheckedMainLanguage(state),
    t: getTranslator(state),
    checkedCheckboxes: getNumberOfCheckedCheckboxes(state, createCheckboxesKey(path)),
    totalCheckboxes: getTotalNumberOfCheckboxes(state, createCheckboxesKey(path)),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
