import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DyslexiaSwitch.scss';
import Switch from 'react-switch';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';
import {getTranslator} from '../../selectors/translate';

const DyslexiaSwitch = ({t, showDyslexicFont, setShowDyslexicFont}) => {
  const handleChange = useCallback(() => 
    setShowDyslexicFont(!showDyslexicFont), [showDyslexicFont, setShowDyslexicFont]
  );

  return (
    <label htmlFor='switch' className={styles.container}>
      <span className={styles.text}>{t('footer.dyslexia')}</span>
      <Switch
        onChange={handleChange}
        checked={showDyslexicFont}
        id='switch'
        onColor='#000'
      />
    </label>
  );
};


DyslexiaSwitch.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDyslexicFont: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setShowDyslexicFont: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDyslexicFont: state.showDyslexicFont,
});

const mapDispatchToProps = {
  setShowDyslexicFont,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DyslexiaSwitch));
