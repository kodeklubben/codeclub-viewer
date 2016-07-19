import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import FlagNorway from './FlagNorway';
import FlagSweden from './FlagSweden';
import FlagDenmark from './FlagDenmark';

import styles from './Flag.scss';

const Flag = React.createClass({

  getCountry(country) {
    switch (country) {
      case 'norway':
        return <FlagNorway/>;
      case 'sweden':
        return <FlagSweden/>;
      case 'denmark':
        return <FlagDenmark/>;
    }
  },

  render() {
    return (
      <div className={styles.flag}>
        {this.getCountry(this.props.country || 'norway')}
      </div>
    );
  }

});

export default withStyles(styles)(Flag);
