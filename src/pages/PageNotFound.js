import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PageNotFound.scss';
import {getTranslator} from '../selectors/translate';
import Head from '../components/Head';

const PageNotFound = ({t}) => {
  useStyles(styles);
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

PageNotFound.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(mapStateToProps)(PageNotFound);
