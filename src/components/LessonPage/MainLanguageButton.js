import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './MainLanguageButton.scss';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';
import {getAvailableLanguages} from '../../utils/filterUtils';
import {getLessonPath, getLessonExternal} from '../../resources/lessonFrontmatter';

const MainLanguageButton = ({path, enabled, language, buttonText}) => {
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
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  path: PropTypes.string,
  enabled: PropTypes.bool,
  language: PropTypes.oneOf(getAvailableLanguages()),
  buttonText: PropTypes.string.isRequired,
};

const mapStateToProps = (state, {course, lesson, isReadme}) => {
  const t = getTranslator(state);
  const tf = getTranslateFilter(state);
  const language = state.language; // E.g. 'en'
  const lang = tf('language', language); // Name of language, e.g. 'English'
  const path = getLessonPath(course, lesson, language, isReadme);
  const external = getLessonExternal(course, lesson, language, isReadme);
  const enabled = path && !external;
  return {
    path,
    enabled,
    language,
    buttonText: t(enabled ? 'lessons.tomainlanguage' : 'lessons.nottranslated', {lang}),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(MainLanguageButton));
