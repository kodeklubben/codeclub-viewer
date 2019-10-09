import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './DyslexiaSwitch.scss';
import Switch from 'react-switch';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';
import {getTranslator} from '../../selectors/translate';

const DyslexiaSwitch = () => {
  useStyles(styles);

  const t = useSelector(state => getTranslator(state));
  const showDyslexicFont = useSelector(state => state.showDyslexicFont);

  const dispatch = useDispatch();

  return (
    <label htmlFor='switch' className={styles.container}>
      <span className={styles.text}>{t('footer.dyslexia')}</span>
      <Switch
        onChange={() => dispatch(setShowDyslexicFont(!showDyslexicFont))}
        checked={showDyslexicFont}
        id='switch'
        onColor='#000'
      />
    </label>
  );
};

export default DyslexiaSwitch;
