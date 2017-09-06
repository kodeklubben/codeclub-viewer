import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ResetButton.scss';
import {getTranslator} from '../../selectors/translate';
import {setCheckbox} from '../../action_creators';
import {setCheckboxes} from '../../util';

const ResetButton = ({path, t, setCheckbox}) => {
  const bsStyle = 'warning';
  const bsSize = 'small';
  const onClick = () => setCheckboxes(path, {}, setCheckbox);
  const className = styles.container;
  return <Button {...{className, bsSize, bsStyle, onClick}}>{t('lessons.reset')}</Button>;
};

ResetButton.propTypes = {
  // ownProps
  path: PropTypes.string.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

const mapDispatchToProps = {
  setCheckbox
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResetButton));
