import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './DarkModeSwitch.scss';
import Switch from 'react-switch';
import {setShowDarkMode} from '../../reducers/showDarkMode';
import {getTranslator} from '../../selectors/translate';

const DarkModeSwitch = ({t, showDarkMode, setShowDarkMode}) => {
  useStyles(styles);
  return (
    <label htmlFor='darkmodeswitch' className={styles.container}>
      <span className={styles.text}>{t('footer.darkmode')}</span>
      <Switch
        onChange={() => setShowDarkMode(!showDarkMode)}
        checked={showDarkMode}
        id='darkmodeswitch'
        onColor='#000'
      />
    </label>
  );
};


DarkModeSwitch.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDarkMode: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setShowDarkMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDarkMode: state.showDarkMode,
});

const mapDispatchToProps = {
  setShowDarkMode
};

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeSwitch);
