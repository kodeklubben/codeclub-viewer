import React from 'react';

const IconLevelBlack = React.createClass({

  render() {
    const layout = {
      fill:'#333333',
      stroke:'#000000',
      strokeWidth:'5',
      strokeMiterlimit:'10'
    };

    return (
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 257 257">
        <rect x="40.1" y="40.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -53.2412 128.5355)"
          style={layout} width="176.8" height="176.8"/>
      </svg>
    );
  }

});

export default IconLevelBlack;
