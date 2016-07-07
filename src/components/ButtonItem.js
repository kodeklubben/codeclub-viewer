import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './ButtonItem.scss';

const ButtonItem = React.createClass({

  render() {
    return (
      <button className={styles[this.props.color || 'green']} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }

});

export default withStyles(styles)(ButtonItem);
