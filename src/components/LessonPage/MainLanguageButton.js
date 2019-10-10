import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './MainLanguageButton.scss';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';
import {getLessonPath, getLessonExternal} from '../../resources/lessonFrontmatter';

const MainLanguageButton = ({course, lesson, isReadme}) => {
  useStyles(styles);

  const t = useSelector(state => getTranslator(state));
  const tf = useSelector(state => getTranslateFilter(state));
  const language = useSelector(state => state.language);

  const lang = tf('language', language); // Name of language, e.g. 'English'
  const path = getLessonPath(course, lesson, language, isReadme);
  const external = getLessonExternal(course, lesson, language, isReadme);
  const enabled = path && !external;
  const buttonText = t(enabled ? 'lessons.tomainlanguage' : 'lessons.nottranslated', {lang});

  const options = {
    className: styles.container,
    bsStyle: 'info',
    bsSize: 'small',
    disabled: !enabled,
  };

  const button = (
    <Button {...options}>
      <Flag language={language}/>
      <span className={styles.textMargin}>{buttonText}</span>
    </Button>
  );
  return enabled ? <LinkContainer to={path}>{button}</LinkContainer> : button;
};

MainLanguageButton.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default MainLanguageButton;
