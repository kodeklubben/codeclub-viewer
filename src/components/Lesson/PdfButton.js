import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PdfButton.scss';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';

const PdfButton = ({t, href}) => {
  const buttonText= t('lessons.pdf');
  const bsStyle = 'pdf';
  const bsSize = 'small';
  const className = styles.container;
  return <Button {...{className, bsStyle, bsSize, href}}>
    {buttonText}
  </Button>;
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
