import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LevelIcon.scss';

const LevelIcon = ({level}) => {
  return level ?
    <img className={styles.levelIcon} src={require('../assets/graphics/level-' + level + '.svg')}/>
    : null;
};

LevelIcon.propTypes = {
  // ownProps
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default withStyles(styles)(LevelIcon);
