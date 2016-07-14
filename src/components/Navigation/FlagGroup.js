import React from 'react';

const FlagGroup = React.createClass({

  render() {
    const lang = {
      nor: {
        s0: {fill: '#ef2b2d'},
        s1: {fill: '#ffffff'},
        s2: {fill: '#002868'}
      },
      swe: {
        s0: {fill: '#006aa7'},
        s1: {fill: '#fecc00'}
      },
      den: {
        s0: {fill: '#c60c30'},
        s1: {fill: '#ffffff'}
      }
    };

    return (
      <div>
        <div href="#clicked">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="30" height="20" viewBox="0 0 500 350">
            <rect style={lang.nor.s0} width="500" height="350"/>
            <rect x="136.4" style={lang.nor.s1} width="90.9" height="350"/>
            <rect y="131.3" style={lang.nor.s1} width="500" height="87.5"/>
            <rect x="159.1" style={lang.nor.s2} width="45.5" height="350"/>
            <rect y="153.1" style={lang.nor.s2} width="500" height="43.8"/>
          </svg>
        </div>
        <div href="#clicked">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="30" height="20" viewBox="0 0 500 350">
            <rect style={lang.swe.s0} width="500" height="350"/>
            <rect x="162.2" style={lang.swe.s1} width="54.1" height="350"/>
            <rect y="150" style={lang.swe.s1} width="500" height="50"/>
          </svg>
        </div>
        <div href="#clicked">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="30" height="20" viewBox="0 0 500 350">
            <rect style={lang.den.s0} width="500" height="350"/>
            <rect x="156.3" style={lang.den.s1} width="62.5" height="350"/>
            <rect y="140" style={lang.den.s1} width="500" height="70"/>
          </svg>
        </div>
      </div>
    );
  }

});

export default FlagGroup;
