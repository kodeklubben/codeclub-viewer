import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PrintButton.scss';
import {getTranslator} from '../../selectors/translate';

const PrintButton = ({t}) => {
  const bsStyle = 'danger';
  const bsSize = 'small';
  const onClick = () => window.print();
  const className = styles.buttonMargin;
  return <Button {...{className, bsSize, bsStyle, onClick}}>{t('lessons.print')}</Button>;
};

PrintButton.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PrintButton));
