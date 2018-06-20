import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PdfButton.scss';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const PdfButton = ({t, href}) => {
  const options = {
    href,
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
  // mapStateToProps
  t: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
};

const mapStateToProps = (state, {lessonfile}) => ({
  t: getTranslator(state),
  href: lessonfile + '.pdf',
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PdfButton));
