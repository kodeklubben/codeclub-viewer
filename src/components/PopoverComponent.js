import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import {fontFamilyDyslexic} from '../styles/fonts';

const contentStyles = {
  maxWidth: 600,
  padding: 20,
  display: 'flex',
  justifyContent: 'space-between',
  '& img': {
    marginRight: 15,
  },
};

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
    ...contentStyles,
  },
  dyslexicContent: {
    ...contentStyles,
    fontFamily: fontFamilyDyslexic,
  },
});

class PopoverComponent extends React.Component {
  state = {
    anchorEl: null,
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
    const {classes, inFilter, popoverContent, showDyslexicFont} = this.props;
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
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    };
    const content = showDyslexicFont ? classes.dyslexicContent : classes.content;
    return (
      <div>
        <IconButton classes={{root: classes.iconButton}} onClick={this.handleClick} aria-label='Info'>
          <InfoIcon classes={{root: inFilter ? classes.smallIcon : ''}} />
        </IconButton>
        <Popover {...options}>
          <Typography component='div' className={content} role='region' dangerouslySetInnerHTML={createMarkup()}/>
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

  // mapStateToProps
  showDyslexicFont: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PopoverComponent));
