import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './MainLanguageButton.scss';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';
import {getAvailableLanguages} from '../../util';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';

const MainLanguageButton = ({path, language, buttonText}) => {
  const button = (
    <Button className={styles.container} bsStyle={'info'} bsSize={'small'} disabled={!path}>
      <Flag language={language}/>
      <span className={styles.textMargin}>{buttonText}</span>
    </Button>
  );
  return path ? <LinkContainer to={path}>{button}</LinkContainer> : button;
};

MainLanguageButton.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  path: PropTypes.string,
  language: PropTypes.oneOf(getAvailableLanguages()),
  buttonText: PropTypes.string.isRequired,
};

const mapStateToProps = (state, {course, lesson, isReadme}) => {
  const t = getTranslator(state);
  const tf = getTranslateFilter(state);
  const language = state.language; // E.g. 'en'
  const lang = tf('language', language); // Name of language, e.g. 'English'
  const {path} = getLessonFrontmatter(course, lesson, language, isReadme);

  return {
    path,
    language,
    buttonText: t(path ? 'lessons.tomainlanguage' : 'lessons.nottranslated', {lang}),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(MainLanguageButton));
