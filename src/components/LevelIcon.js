import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './LevelIcon.scss';

const LevelIcon = React.createClass({
  render() {
    return this.props.level ?
      <img className={styles.levelIcon}
           src={require('../assets/graphics/level-' + this.props.level + '.svg')}/>
      : null;
  }
});

LevelIcon.propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default withStyles(styles)(LevelIcon);
