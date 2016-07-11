import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './FlagGroup.scss';
import FlagNorway from '../../assets/graphics/FlagNorway';
import FlagSweden from '../../assets/graphics/FlagDenmark';
import FlagDenmark from '../../assets/graphics/FlagSweden';

const FlagGroup = React.createClass({

  render() {
    return (
      <div className={styles.languageGroup}>
        <a className={styles.languageItem} href="#clicked">
          <FlagNorway />
        </a>
        <a className={styles.languageItem} href="#clicked">
          <FlagSweden />
        </a>
        <a className={styles.languageItem} href="#clicked">
          <FlagDenmark />
        </a>
      </div>
    );
  }

});

export default withStyles(styles)(FlagGroup);
