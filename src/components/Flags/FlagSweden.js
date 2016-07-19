import React from 'react';

const FlagSweden = React.createClass({

  render() {
    const color = {
      s0: {fill: '#c60c30'},
      s1: {fill: '#ffffff'}
    };

    return (
      <svg version="1.1" x="0px" y="0px" width="30" height="20" viewBox="0 0 500 350">
        <rect style={color.s0} width="500" height="350"/>
        <rect x="156.3" style={color.s1} width="62.5" height="350"/>
        <rect y="140" style={color.s1} width="500" height="70"/>
      </svg>
    );
  }

});

export default FlagSweden;
