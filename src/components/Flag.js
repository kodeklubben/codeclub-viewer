import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Flag.scss';
import {getAvailableLanguages} from '../util';
import {getTranslateTag} from '../selectors/translate';

const Flag = ({language, translateTag}) =>
  <img
    className={styles.flag}
    src={require(`../assets/graphics/flag_${language}.svg`)}
    alt={translateTag('language', language)}
  />;

Flag.propTypes = {
  // ownProps
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,

  // mapStateToProps
  translateTag: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  translateTag: getTranslateTag(state),
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(Flag));
