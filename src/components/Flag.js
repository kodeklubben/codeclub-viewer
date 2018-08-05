import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {getAvailableLanguages} from '../utils/filterUtils';
import {getTranslateFilter} from '../selectors/translate';

const styles = {
  flag: {
    width: '30px',
    height: '20px',
  },
};

const Flag = ({classes, language, translateFilter}) =>
  <img
    className={classes.flag}
    src={require(`../assets/graphics/flag_${language}.svg`)}
    alt={translateFilter('language', language)}
  />;

Flag.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,

  // mapStateToProps
  translateFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  translateFilter: getTranslateFilter(state),
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(Flag));
