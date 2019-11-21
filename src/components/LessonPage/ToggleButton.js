import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Collapse} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
    borderRadius: 4,
    padding: '0 16px',
    minWidth: 64,
    height: 36,
    textTransform: 'uppercase',
    cursor: 'pointer',
    backgroundColor: '#fafafa',
    fontWeight: 500,
    fontSize: '1rem',
  },
}));

const ToggleButton = ({buttonText, hiddenHTML}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <button className={classes.root} onClick={handleClick}>
        {buttonText}
      </button>
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
