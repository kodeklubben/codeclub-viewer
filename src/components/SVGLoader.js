import React from 'react';

const SVGLoader = React.createClass({

  render() {
    const st0 = { fill: '#ef2b2d' };
    const st1 = { fill: '#ffffff' };
    const st2 = { fill: '#002868' };

    return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 500 350">
        <rect style={st0} width="500" height="350"/>
        <rect x="136.4" style={st1} width="90.9" height="350"/>
        <rect y="131.3" style={st1} width="500" height="87.5"/>
        <rect x="159.1" style={st2} width="45.5" height="350"/>
        <rect y="153.1" style={st2} width="500" height="43.8"/>
      </svg>
    );
  }

});

export default SVGLoader;
