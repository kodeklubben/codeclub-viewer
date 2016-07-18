import React from 'react';

const IconLevelGreen = React.createClass({

  render() {
    const layout = {
      fill:'#36D836',
      stroke:'#289928',
      strokeWidth:'5',
      strokeMiterlimit:'10'
    };

    return (
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 255 255">
        <circle style={layout} cx="127.5" cy="127.5" r="125"/>
      </svg>
    );
  }

});

export default IconLevelGreen;
