import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LaunchIcon from '@material-ui/icons/Launch';
import StarIcon from '@material-ui/icons/Star';
import LinearProgress from '@material-ui/core/LinearProgress';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
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

const styles = theme => ({
  progressBarLevel1: {
    backgroundColor: '#46cc46',
  },
  progressBarLevel2: {
    backgroundColor: '#368bd8',
  },
  progressBarLevel3: {
    backgroundColor: '#d63838',
  },
  progressBarLevel4: {
    backgroundColor: '#333',
  },
  rootLevel1: {
    height: 8,
    backgroundColor: green[50],
  },
  rootLevel2: {
    height: 8,
    backgroundColor: blue[50],
  },
  rootLevel3: {
    height: 8,
    backgroundColor: red[50],
  },
  rootLevel4: {
    height: 8,
    backgroundColor: grey[300],
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
});

const LessonItem = ({
  classes, course, lesson, language,
  title, path, external, popoverContent, isStudentMode, onlyCheckedMainLanguage,
  t, checkedCheckboxes, totalCheckboxes
}) => {
  const level = getLevel(course, lesson);
  const flag = onlyCheckedMainLanguage ? null :
    <div className={classes.marginLeft}><Flag language={language}/></div>;
  const levelIcon = <div className={classes.marginLeft}><LevelIcon {...{level}}/></div>;
  const instructionButton = isStudentMode ? null :
    <InstructionButton {...{course, lesson, language, isReadme: true, onlyIcon: true, insideLink: true}} />;
  const popoverButton = popoverContent ? <PopoverComponent inFilter={false} {...{popoverContent}}/> : null;
  const progress = checkedCheckboxes && level > 0 ? <span>{`(${checkedCheckboxes}/${totalCheckboxes})`}</span> : null;
  const progressPercent = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  const progressBar = checkedCheckboxes && level > 0 ?
    <LinearProgress
      classes={{
        bar: classes['progressBarLevel' + level],
        root: classes['rootLevel' + level]
      }}
      variant='determinate'
      value={progressPercent}
    />
    : null;
  return (
    <div>
      <div className={classes.container}>
        {external ?
          <ListItem component={Link} button to={external} target='_blank' rel='noopener'>
            {flag}
            {levelIcon}
            <ListItemText primary={title}/>
            <LaunchIcon className={classes.launchIcon}/>
          </ListItem>
          :
          <ListItem component={Link} button to={path}>
            {flag}
            {levelIcon}
            <ListItemText primary={title} secondary={progress}/>
            {progressPercent === 100 ? <StarIcon color='action'/> : null}
          </ListItem>
        }
        {instructionButton}
        {popoverButton}
      </div>
      {progressBar}
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
