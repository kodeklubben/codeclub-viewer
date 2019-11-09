import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, IconButton, Popover, Typography} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import {hashCode} from '../utils/util';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popover: {
    maxWidth: 600,
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
}));

const PopoverComponent = ({popoverContent, size}) => {
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
      <IconButton className={classes.icon}  aria-describedby={id} {...{size}} onClick={handleClick}>
        <HelpIcon/>
      </IconButton>
      <Popover
        className={classes.popover}
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
        <Card><CardContent><Typography dangerouslySetInnerHTML={{__html: popoverContent}}/></CardContent></Card>
      </Popover>
    </React.Fragment>
  );
};

PopoverComponent.propTypes = {
  popoverContent: PropTypes.string,
  size: PropTypes.string,
};

export default PopoverComponent;
