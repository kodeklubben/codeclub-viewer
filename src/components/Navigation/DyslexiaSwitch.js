import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DyslexiaSwitch.scss';
import Switch from 'react-switch';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';

const DyslexiaSwitch = ({showDyslexicFont, setShowDyslexicFont}) => (
  <label htmlFor='switch'>
    <span className={styles.text}>Tilpasset dysleksi</span>
    <Switch
      className={styles.switch}
      onChange={() => setShowDyslexicFont(!showDyslexicFont)}
      checked={showDyslexicFont}
      id='swtich'
    />
  </label>
);

DyslexiaSwitch.propTypes = {
  // mapStateToProps
  showDyslexicFont: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setShowDyslexicFont: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
});

const mapDispatchToProps = {
  setShowDyslexicFont,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DyslexiaSwitch));
