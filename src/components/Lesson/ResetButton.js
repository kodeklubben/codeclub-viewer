import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ResetButton.scss';
import {getTranslator} from '../../selectors/translate';
import {setCheckbox} from '../../action_creators';
import {setCheckboxes} from '../../util';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ResetButton = ({path, t, setCheckbox}) => {
  const bsStyle = 'warning';
  const bsSize = 'small';
  const onClick = () => setCheckboxes(path, {}, setCheckbox);
  const className = styles.container;
  return (
    <Button {...{className, bsSize, bsStyle, onClick}}>
      <Glyphicon className={styles.icon} glyph={'remove'}/>
      <span className={styles.textMargin}>{t('lessons.reset')}</span>
    </Button>
  );
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
