/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {getTranslator} from '../../selectors/translate';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
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
});

const PdfButton = ({classes, course, lesson, language, isReadme, t}) => {
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
      <span className={classes.text}>{t('lessons.pdf')}</span>
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
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PdfButton));
