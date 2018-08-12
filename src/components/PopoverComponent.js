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
  maxWidth: '600px',
  padding: '20px',
  display: 'flex',
  'justify-content': 'space-between',
  '& img': {
    marginRight: '15px',
  },
};

const styles = theme => ({
  popover: {
    '& img': {
      width: '100%',
      height: '100%',
      maxWidth: '200px',
      maxHeight: '250px',
    },
    [theme.breakpoints.down('xs')]: {
      '& img': {
        maxWidth: '100px',
        maxHeight: '125px',
      },
    },
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
    const {classes, popoverContent, showDyslexicFont} = this.props;
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
        <IconButton onClick={this.handleClick} aria-label='Info'>
          <InfoIcon/>
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
  children: PropTypes.node,
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
