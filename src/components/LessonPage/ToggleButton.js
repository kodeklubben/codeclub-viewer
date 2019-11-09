import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Collapse} from '@material-ui/core';

const ToggleButton = ({buttonText, hiddenHTML}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClick}>
        {buttonText}
      </Button>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <div dangerouslySetInnerHTML={{__html: hiddenHTML}}/>
      </Collapse>
    </React.Fragment>
  );
};

ToggleButton.propTypes = {
  buttonText: PropTypes.string,
  hiddenHTML: PropTypes.string
};

export default ToggleButton;
