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

const MainLanguageButton = ({path, external, language, buttonText}) => {
  console.log('path', path);
  console.log('external', external);
  const options = {
    className: styles.container,
    bsStyle: 'info',
    bsSize: 'small',
    disabled: !path || external.length > 0,
  };
  const button = (
    <Button {...options}>
      <Flag language={language}/>
      <span className={styles.textMargin}>{buttonText}</span>
    </Button>
  );
  return path && !external ? <LinkContainer to={path}>{button}</LinkContainer> : button;
};

MainLanguageButton.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  path: PropTypes.string,
  external: PropTypes.string,
  language: PropTypes.oneOf(getAvailableLanguages()),
  buttonText: PropTypes.string.isRequired,
};

const mapStateToProps = (state, {course, lesson, isReadme}) => {
  const t = getTranslator(state);
  const tf = getTranslateFilter(state);
  const language = state.language; // E.g. 'en'
  const lang = tf('language', language); // Name of language, e.g. 'English'
  const {path, external} = getLessonFrontmatter(course, lesson, language, isReadme);
  return {
    path,
    external,
    language,
    buttonText: t(path && !external ? 'lessons.tomainlanguage' : 'lessons.nottranslated', {lang}),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(MainLanguageButton));
