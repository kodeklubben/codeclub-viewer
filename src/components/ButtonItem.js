import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './ButtonItem.scss';

const ButtonItem = React.createClass({

  render() {
    var buttonStyle;

    switch(this.props.color) {
      case 'green':
        buttonStyle = styles.green;
        break;
      case 'blue':
        buttonStyle = styles.blue;
        break;
      default:
        buttonStyle = styles.green;
    }

    return (
      <button className={buttonStyle} onClick={this.props.handleClick}>
        {this.props.children}
      </button>
    );
  }

});

export default withStyles(styles)(ButtonItem);
