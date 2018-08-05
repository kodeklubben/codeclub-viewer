import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  popover: {
    maxWidth: '600px',
    '& img': {
      width: '100%',
      height: '100%',
      maxWidth: '200px',
      maxHeight: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      '& img': {
        maxWidth: '100px',
        maxHeight: '125px',
      },
    },
  },
  content: {
    padding: '10px',
    display: 'flex',
    'justify-content': 'space-between',
    '& img': {
      marginRight: '15px',
    },
  },
});

class PopoverComponent extends React.Component {
  state = {
    ancherel: null,
  };

  handleClick = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {classes, popoverContent} = this.props;
    const {anchorEl} = this.state;
    const createMarkup = () => {
      return {__html: popoverContent};
    };
    const options = {
      className: classes.popover,
      open: Boolean(anchorEl),
      anchorEl,
      onClose: this.handleClose,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    };
    return (
      <div>
        <IconButton onClick={this.handleClick} aria-label='Info'>
          <InfoIcon/>
        </IconButton>
        <Popover {...options}>
          <div className={classes.content} dangerouslySetInnerHTML={createMarkup()}/>
        </Popover>
      </div>
    );
  }
}

PopoverComponent.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  popoverContent: PropTypes.string,
};

export default (withStyles(styles)(PopoverComponent));
