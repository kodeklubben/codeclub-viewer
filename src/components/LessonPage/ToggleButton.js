/* eslint-env node */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';

const ToggleButton = ({buttonText, hiddenHTML}) => {
  const [open, handleClick] = useState(false);

  const containerStyle = {
    margin: '10px 0',
    padding: '10px',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#eee',
  };
  const contentStyle = {
    paddingTop: '20px',
  };
  return (
    <div style={containerStyle}>
      <Button onClick={() => handleClick(!open)}>
        {buttonText}
      </Button>
      <Collapse in={open}>
        <div>
          <div style={contentStyle}>
            <div dangerouslySetInnerHTML={{__html: hiddenHTML}}/>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

ToggleButton.propTypes = {
  // ownProps
  buttonText: PropTypes.string,
  hiddenHTML: PropTypes.string
};

export default ToggleButton;
