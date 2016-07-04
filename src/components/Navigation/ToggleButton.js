import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './ToggleButton.scss';

const ToggleButton = React.createClass({

  getInitialState() {
    return {
      from: this.props.from,
      to: this.props.to,
      toggle: true
    };
  },

  onClick() {
    this.props.onClick();
    this.setState({toggle: !this.state.toggle});
  },

  render() {
    return (
      <button className={this.state.toggle ? styles.from : styles.to} onClick={this.onClick}>
        {this.state.toggle ? this.state.from : this.state.to}
      </button>
    );
  }

});

export default withStyles(styles)(ToggleButton);
