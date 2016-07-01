import React from 'react';

const ButtonItem = React.createClass({

  render() {
    return (
      <button className={this.props.styles} onClick={this.props.handleClick}>
        {this.props.text}
      </button>
    );
  }

});

export default ButtonItem;
