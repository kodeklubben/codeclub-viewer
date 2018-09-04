import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  popover: {
    '& img': {
      width: '100%',
      height: '100%',
      maxWidth: 200,
      maxHeight: 250,
    },
    [theme.breakpoints.down('xs')]: {
      '& img': {
        maxWidth: 100,
        maxHeight: 125,
      },
    },
  },
  smallIcon: {
    fontSize: 18,
  },
  iconButton: {
    width: 36,
    height: 36,
  },
  content: {
    fontSize: 16,
    maxWidth: 600,
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    '& img': {
      marginRight: 15,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
});

class PopoverComponent extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  createMarkup = () => ({__html: this.props.popoverContent});

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
    const {classes, inFilter} = this.props;
    const {anchorEl} = this.state;
    const options = {
      className: classes.popover,
      open: Boolean(anchorEl),
      anchorEl,
      onClose: this.handleClose,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    };
    return (
      <div>
        <IconButton classes={{root: inFilter ? classes.iconButton : ''}} onClick={this.handleClick} aria-label='Info'>
          <InfoIcon classes={{root: inFilter ? classes.smallIcon : ''}} />
        </IconButton>
        <Popover {...options}>
          <Typography
            component='div'
            className={classes.content}
            role='region'
            dangerouslySetInnerHTML={this.createMarkup()}
          />
        </Popover>
      </div>
    );
  }
}

PopoverComponent.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  inFilter: PropTypes.bool.isRequired,
  popoverContent: PropTypes.string,
};
export default (withStyles(styles)(PopoverComponent));
