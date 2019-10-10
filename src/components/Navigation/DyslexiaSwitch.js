import React from 'react';
import {useSelector, connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './DyslexiaSwitch.scss';
import Switch from 'react-switch';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';
import {getTranslator} from '../../selectors/translate';

const DyslexiaSwitch = ({setShowDyslexicFont}) => {
  useStyles(styles);

  const {t, showDyslexicFont} = useSelector(state => ({
    t: getTranslator(state),
    showDyslexicFont: state.showDyslexicFont,
  }));

  return (
    <label htmlFor='switch' className={styles.container}>
      <span className={styles.text}>{t('footer.dyslexia')}</span>
      <Switch
        onChange={() => setShowDyslexicFont(!showDyslexicFont)}
        checked={showDyslexicFont}
        id='switch'
        onColor='#000'
      />
    </label>
  );
};

const mapDispatchToProps = {
  setShowDyslexicFont,
};

export default connect(null, mapDispatchToProps)(DyslexiaSwitch);
