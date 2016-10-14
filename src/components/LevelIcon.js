import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './LevelIcon.scss';

const LevelIcon = React.createClass({
  render() {
    return this.props.level ?
      this.props.size ?
        <img className={styles[this.props.size]}
             src={require('../assets/graphics/level-' + this.props.level + '.svg')}/>
        : this.props.level
      :  null;
  }
});

LevelIcon.propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default withStyles(styles)(LevelIcon);
