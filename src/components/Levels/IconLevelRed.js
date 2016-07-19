import React from 'react';

const IconLevelBlue = React.createClass({

  render() {
    const layout = {
      fill:'#D64738',
      stroke:'#993129',
      strokeWidth:'5',
      strokeMiterlimit:'10'
    };

    return (
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 258 258">
        <polygon style={layout} points="129,5.6 254,255.6 4,255.6"/>
      </svg>
    );
  }

});

export default IconLevelBlue;
