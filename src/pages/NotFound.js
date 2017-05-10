import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './NotFound.scss';
import {getTranslator} from '../selectors/translate';

const NotFound = (props) => {
  return (
    <div className={styles.center}>
      <h3>{props.t('404.header')}</h3>
      <p>{props.t('404.textline1')}</p>
      <p>(404)</p>
      <p><Link to="/">{props.t('404.tofrontpage')}</Link></p>
    </div>
  );
};

NotFound.propTypes = {
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state)
  };
}

export const NotFoundContainer = connect(
	mapStateToProps)(withStyles(styles)(NotFound));
