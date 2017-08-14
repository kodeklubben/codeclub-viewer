import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PageNotFound.scss';
import {getTranslator} from '../selectors/translate';

const PageNotFound = ({t}) => {
  return (
    <div className={styles.center}>
      <h3>{t('404.header')}</h3>
      <p>{t('404.textline1')}</p>
      <p>(404)</p>
      <p><Link to="/">{t('404.tofrontpage')}</Link></p>
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

export default connect(
	mapStateToProps
)(withStyles(styles)(PageNotFound));
