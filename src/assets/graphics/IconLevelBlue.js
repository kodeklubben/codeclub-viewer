import React from 'react';

const IconLevelBlue = React.createClass({

  render() {
    const layout = {
      fill:'#368BD8',
      stroke:'#286999',
      strokeWidth:'5',
      strokeMiterlimit:'10'
    }

    return (
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 255 255">
        <rect x="2.5" y="2.5" style={layout} width="250" height="250"/>
      </svg>
    );
  }

});

export default IconLevelBlue;
