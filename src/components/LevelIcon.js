import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LevelIcon.scss';
import Image from 'react-bootstrap/lib/Image';

const LevelIcon = ({level}) => {
  return level ?
    <Image className={styles.levelIcon} src={require('../assets/graphics/level-' + level + '.svg')}
      alt={'Level' + level}
    />
    : null;
};

LevelIcon.propTypes = {
  // ownProps
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default withStyles(styles)(LevelIcon);
