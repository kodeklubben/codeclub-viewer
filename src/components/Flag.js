import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Flag.scss';
import {getAvailableLanguages} from '../util';
import {getTranslator, getTranslateFilter} from '../selectors/translate';

const Flag = ({language, translateFilter, t}) =>
  <img
    className={styles.flag}
    src={require(`../assets/graphics/flag_${language}.svg`)}
    alt={t('general.picture') + translateFilter('language', language)}
  />;

Flag.propTypes = {
  // ownProps
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,

  // mapStateToProps
  translateFilter: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  translateFilter: getTranslateFilter(state),
  t: getTranslator(state),
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(Flag));
