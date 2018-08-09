/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {getTranslator} from '../../selectors/translate';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';
import {fontFamilyDyslexic} from '../../styles/fonts';

const styles = theme => ({
  button: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover, &:active, &:focus, &:visited': {
      backgroundColor: red[900],
      color: theme.palette.getContrastText(red[900]),
      textDecoration: 'none',
    },
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    '@media print': {
      display: 'none',
    },
  },
  text: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  dyslexicText: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    fontFamily: fontFamilyDyslexic,
  },
});

const PdfButton = ({classes, course, lesson, language, isReadme, t, showDyslexicFont}) => {
  const {path} = getLessonFrontmatter(course, lesson, language, isReadme);
  const options = {
    href: `${process.env.PUBLICPATH}${path.slice(1)}.pdf`,
    className: classes.button,
    download: true,
    variant: 'outlined',
    color: 'default',
    size: 'small',
    'aria-label': t('lessons.pdf'),
  };
  return (
    <Button {...options}>
      <CloudDownloadIcon/>
      <span className={showDyslexicFont ? classes.dyslexicText : classes.text}>{t('lessons.pdf')}</span>
    </Button>
  );
};

PdfButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDyslexicFont: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDyslexicFont: state.showDyslexicFont,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PdfButton));
