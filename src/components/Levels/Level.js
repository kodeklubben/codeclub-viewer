import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import IconLevelGreen from './IconLevelGreen';
import IconLevelBlue from './IconLevelBlue';
import IconLevelRed from './IconLevelRed';
import IconLevelBlack from './IconLevelBlack';

import styles from './Level.scss';

const Level = React.createClass({

  getLevel(level) {
    switch (level) {
      case 1:
        return <IconLevelGreen/>;
      case 2:
        return <IconLevelBlue/>;
      case 3:
        return <IconLevelRed/>;
      case 4:
        return <IconLevelBlack/>;
    }
  },

  render() {
    return (
      <div className={styles.level}>
        {this.getLevel(this.props.level)}
      </div>
    );
  }

});

export default withStyles(styles)(Level);
