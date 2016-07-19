import React from 'react';

const FlagNorway = React.createClass({

  render() {
    const color = {
      s0: {fill: '#ef2b2d'},
      s1: {fill: '#ffffff'},
      s2: {fill: '#002868'}
    };

    return (
      <svg version="1.1" x="0px" y="0px" width="30" height="20" viewBox="0 0 500 350">
        <rect style={color.s0} width="500" height="350"/>
        <rect x="136.4" style={color.s1} width="90.9" height="350"/>
        <rect y="131.3" style={color.s1} width="500" height="87.5"/>
        <rect x="159.1" style={color.s2} width="45.5" height="350"/>
        <rect y="153.1" style={color.s2} width="500" height="43.8"/>
      </svg>
    );
  }

});

export default FlagNorway;
