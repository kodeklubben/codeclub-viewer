import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LaunchIcon from '@material-ui/icons/Launch';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
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
import {fontFamilyDyslexic} from '../../styles/fonts';

const bar = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  height: 10,
};

const styles = theme => ({
  progressBarLevel1: {
    ...bar,
    backgroundColor: '#46cc46',
  },
  progressBarLevel2: {
    ...bar,
    backgroundColor: '#368bd8',
  },
  progressBarLevel3: {
    ...bar,
    backgroundColor: '#d63838',
  },
  progressBarLevel4: {
    ...bar,
    backgroundColor: '#333',
  },
  marginLeft: {
    marginLeft: theme.spacing.unit * 1.5,
  },
  launchIcon: {
    marginRight: theme.spacing.unit * 1.5,
  },
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  studentRoot: {
    backgroundColor: green[50],
  },
  teacherRoot: {
    backgroundColor: blue[50],
  },
  dyslexicText: {
    fontFamily: fontFamilyDyslexic,
  },
});

const Progress = ({classes, checkedCheckboxes, totalCheckboxes, showDyslexicFont}) => {
  return checkedCheckboxes > 0 ?
    <span className={showDyslexicFont ? classes.dyslexicText : ''}>
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
  t, checkedCheckboxes, totalCheckboxes, showDyslexicFont
}) => {
  const level = getLevel(course, lesson);

  const flag = onlyCheckedMainLanguage ? null :
    <div className={classes.marginLeft}><Flag language={language}/></div>;

  const levelIcon = <div className={classes.marginLeft}><LevelIcon {...{level}}/></div>;

  const lessonTitle = <span className={showDyslexicFont ? classes.dyslexicText : ''}>{title}</span>;

  const instructionButton = isStudentMode ? null :
    <InstructionButton {...{course, lesson, language, isReadme: true, onlyIcon: true, insideLink: true}} />;

  const popoverButton = popoverContent ? <PopoverComponent inFilter={false} {...{popoverContent}}/> : null;

  const progress = <Progress {...{classes, checkedCheckboxes, totalCheckboxes, showDyslexicFont}}/>;

  return (
    <div className={isStudentMode ? classes.studentRoot : classes.teacherRoot}>
      <div className={classes.container}>
        {external ?
          <ListItem disableGutters component={Link} button to={external} target='_blank' rel='noopener'>
            {flag}
            {levelIcon}
            <ListItemText primary={lessonTitle}/>
            <LaunchIcon className={classes.launchIcon}/>
          </ListItem>
          :
          <ListItem disableGutters component={Link} button to={path}>
            {flag}
            <Progressbar {...{classes, checkedCheckboxes, totalCheckboxes, level}}/>
            {levelIcon}
            <ListItemText primary={lessonTitle} secondary={progress}/>
          </ListItem>
        }
        {instructionButton}
        {popoverButton}
      </div>
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
  showDyslexicFont: PropTypes.bool.isRequired,
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
    showDyslexicFont: state.showDyslexicFont,
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(LessonItem));
