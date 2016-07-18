import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import FlagNorway from './FlagNorway';
import FlagSweden from './FlagSweden';
import FlagDenmark from './FlagDenmark';
import IconLevelGreen from './IconLevelGreen';
import IconLevelBlue from './IconLevelBlue';
import IconLevelRed from './IconLevelRed';
import IconLevelBlack from './IconLevelBlack';

import styles from './SVGLoader.scss';

const SVGLoader = React.createClass({

  getFlag(type) {
    switch (type) {
      case 'norway':
        return (
          <div className={styles.flag}>
            <FlagNorway/>
          </div>
        );
      case 'sweden':
        return (
          <div className={styles.flag}>
            <FlagSweden/>
          </div>
        );
      case 'denmark':
        return (
          <div className={styles.flag}>
            <FlagDenmark/>
          </div>
        );
    }
  },

  getIcon(type) {
    switch (type) {
      case 'green':
        return (
          <div className={styles.icon}>
            <IconLevelGreen/>
          </div>
        );
      case 'blue':
        return (
          <div className={styles.icon}>
            <IconLevelBlue/>
          </div>
        );
      case 'red':
        return (
          <div className={styles.icon}>
            <IconLevelRed/>
          </div>
        );
      case 'black':
        return (
          <div className={styles.icon}>
            <IconLevelBlack/>
          </div>
        );
    }
  },

  render() {
    var item;

    switch (this.props.type) {
      case 'flag':
        item = this.getFlag(this.props.item);
        break;
      case 'icon':
        item = this.getIcon(this.props.item);
    }

    return (
      <div>
        {item}
      </div>
    );
  }

});

export default withStyles(styles)(SVGLoader);
