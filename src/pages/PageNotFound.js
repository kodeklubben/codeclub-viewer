import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PageNotFound.scss';
import {getTranslator} from '../selectors/translate';
import Head from '../components/Head';

const PageNotFound = () => {
  useStyles(styles);

  const t = useSelector(state => getTranslator(state));

  return (
    <div role='main'>
      <Head title={'404'}/>
      <div className={styles.center}>
        <h3>{t('404.header')}</h3>
        <p>{t('404.textline')}</p>
        <p><Link to="/">{t('404.tofrontpage')}</Link></p>
      </div>
    </div>
  );
};

export default PageNotFound;
