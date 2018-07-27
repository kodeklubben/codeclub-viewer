/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PdfButton.scss';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getLessonFrontmatter} from '../../resources/lessonFrontmatter';

const PdfButton = ({course, lesson, language, isReadme, t}) => {
  const {path} = getLessonFrontmatter(course, lesson, language, isReadme);
  const options = {
    href: `${process.env.PUBLICPATH}${path.slice(1)}.pdf`,
    bsStyle: 'pdf',
    bsSize: 'small',
    className: styles.container,
    download: true,
  };
  // Note that we need to use href in button, and not LinkContainer,
  // since we don't want to go through React Router when getting the pdf.
  return (
    <Button {...options} aria-label={t('lessons.pdf')}>
      <Glyphicon className={styles.icon} glyph={'cloud-download'}/>
      <span className={styles.textMargin}>{t('lessons.pdf')}</span>
    </Button>
  );
};

PdfButton.propTypes = {
  // ownProps
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
