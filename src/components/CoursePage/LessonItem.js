import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import useStyles from 'isomorphic-style-loader/useStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import LevelIcon from '../LevelIcon';
import PopoverComponent from '../PopoverComponent';
import InstructionButton from '../InstructionButton';
import Flag from '../Flag';
import {getLessonTitle, getLessonPath, getLessonExternal} from '../../resources/lessonFrontmatter';
import {getLevel} from '../../resources/lessons';
import {getLessonIntro} from '../../resources/lessonContent';
import {getTranslator} from '../../selectors/translate';
import {onlyCheckedMainLanguage} from '../../selectors/filter';
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

const LessonItem = ({course, lesson, language}) => {
  useStyles(styles);

  const isStudentMode = useSelector(state => state.isStudentMode);
  const isOnlyCheckedMainLanguage = useSelector(state => onlyCheckedMainLanguage(state));
  const t = useSelector(state => getTranslator(state));
  const checkedCheckboxes = useSelector(state => getNumberOfCheckedCheckboxes(state, course, lesson, language, false));
  const totalCheckboxes = useSelector(state => getTotalNumberOfCheckboxes(state, course, lesson, language, false));

  const title = getLessonTitle(course, lesson, language, false);
  const external = getLessonExternal(course, lesson, language, false);
  const popoverContent = getLessonIntro(course, lesson, language, false);
  const level = getLevel(course, lesson);

  const flag = !isOnlyCheckedMainLanguage ?
    <div className={styles.flag}><Flag language={language}/></div> : null;

  const instructionButton = isStudentMode ? null :
    <InstructionButton {...{course, lesson, language, isReadme: true, onlyIcon: true}} />;

  const popoverButton = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <Button bsSize='xs' className={styles.popButton} aria-label={t('general.glyphicon', {title: lesson})}>
        <Glyphicon className={styles.popoverGlyph} glyph='info-sign'/>
      </Button>
    </PopoverComponent>
    : null;

  return (
    <div>
      {external ?
        <ListGroupItem href={external} target='_blank' rel='noopener' className={styles.row}>
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
        <LinkContainer to={getLessonPath(course, lesson, language, false)}>
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
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default LessonItem;
