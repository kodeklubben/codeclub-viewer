import React from 'react';

const FlagSweden = React.createClass({

  render() {
    const color = {
      s0: {fill: '#006aa7'},
      s1: {fill: '#fecc00'}
    };

    return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 500 350">
        <rect style={color.s0} width="500" height="350"/>
        <rect x="162.2" style={color.s1} width="54.1" height="350"/>
        <rect y="150" style={color.s1} width="500" height="50"/>
      </svg>
    );
  }

});

export default FlagSweden;
