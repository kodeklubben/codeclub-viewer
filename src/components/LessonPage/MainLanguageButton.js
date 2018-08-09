import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import {getTranslator, getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';
import {getAvailableLanguages} from '../../utils/filterUtils';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';
import {fontFamilyDyslexic} from '../../styles/fonts';

const styles = theme => ({
  button: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover, &:active, &:focus': {
      backgroundColor: green[900],
      color: theme.palette.getContrastText(green[900]),
      textDecoration: 'none',
    },
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    padding: '9px',
    '@media print': {
      display: 'none',
    },
  },
  text: {
    marginLeft: '8px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  dyslexicText: {
    marginLeft: '8px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    fontFamily: fontFamilyDyslexic,
  },
});

const MainLanguageButton = ({classes, path, enabled, language, buttonText, showDyslexicFont}) => {
  const options = {
    className: classes.button,
    component: Link,
    to: path,
    variant: 'outlined',
    color: 'default',
    size: 'small',
    disabled: !enabled,
  };
  return (
    <Button {...options}>
      <Flag {...{language}}/>
      <span className={showDyslexicFont ? classes.dyslexicText : classes.text}>{buttonText}</span>
    </Button>
  );
};

MainLanguageButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  path: PropTypes.string,
  enabled: PropTypes.bool,
  language: PropTypes.oneOf(getAvailableLanguages()),
  buttonText: PropTypes.string.isRequired,
  showDyslexicFont: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {course, lesson, isReadme}) => {
  const t = getTranslator(state);
  const tf = getTranslateFilter(state);
  const language = state.language; // E.g. 'en'
  const lang = tf('language', language); // Name of language, e.g. 'English'
  const {path, external} = getLessonFrontmatter(course, lesson, language, isReadme);
  const enabled = path && !external;
  return {
    path,
    enabled,
    language,
    buttonText: t(enabled ? 'lessons.tomainlanguage' : 'lessons.nottranslated', {lang}),
    showDyslexicFont: state.showDyslexicFont,
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(MainLanguageButton));
