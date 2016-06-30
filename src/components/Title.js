import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Title.scss';

const Title = React.createClass({

  render() {
    return (
      <div className={styles.container}>Kodeklubben</div>
    );
  }

});

export default withStyles(styles)(Title);
