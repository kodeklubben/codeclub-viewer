import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import styles from './MainLanguageButton.scss';
import {getTranslator, getTranslateTag} from '../../selectors/translate';
import Flag from '../Flag';
import {getAvailableLanguages} from '../../util';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';

const MainLanguageButton = ({course, lesson, isReadme, language, buttonText}) => (
  <LinkContainer to={getLessonFrontmatter(course, lesson, language, isReadme).path}>
    <Button className={styles.container} bsStyle={'info'} bsSize={'small'}>
      <Flag language={language}/>
      <span className={styles.textMargin}>{buttonText}</span>
    </Button>
  </LinkContainer>
);

MainLanguageButton.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  language: PropTypes.oneOf(getAvailableLanguages()),
  buttonText: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const t = getTranslator(state);
  const tt = getTranslateTag(state);
  return {
    language: state.language,
    buttonText: t('lessons.tomainlanguage', {lang: tt('language', state.language)}),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(MainLanguageButton));
