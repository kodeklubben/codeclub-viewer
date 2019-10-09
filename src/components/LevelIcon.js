import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './LevelIcon.scss';

const LevelIcon = ({level}) => {
  useStyles(styles);
  return level ?
    <img
      className={styles.levelIcon}
      src={require('../assets/graphics/level-' + level + '.svg')}
      alt={'Level ' + level}
    />
    : null;
};

LevelIcon.propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default LevelIcon;
