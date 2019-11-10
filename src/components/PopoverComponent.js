import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, Popover, Typography} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import {makeStyles} from '@material-ui/core/styles';
import {hashCode} from '../utils/util';

const useStyles = makeStyles(theme => ({
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    maxWidth: 600,
    '& img': {
      width: '100%',
      height: '100%',
      maxWidth: 200,
      maxHeight: 250,
      marginRight: theme.spacing(2),
    },
  },
  icon: {
    
    marginRight: theme.spacing(1.5),
  },
}));

const PopoverComponent = ({popoverContent}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? hashCode(popoverContent) : undefined;

  return (
    <React.Fragment>
      <IconButton className={classes.icon} aria-describedby={id} size='small' onClick={handleClick}>
        <HelpIcon/>
      </IconButton>
      <Popover
        {...{id, open, anchorEl}}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.text} dangerouslySetInnerHTML={{__html: popoverContent}}/>
      </Popover>
    </React.Fragment>
  );
};

PopoverComponent.propTypes = {
  popoverContent: PropTypes.string,
};

export default PopoverComponent;
