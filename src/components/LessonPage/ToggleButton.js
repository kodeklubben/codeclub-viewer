import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const styles = {
  container: {
    margin: '10px 0',
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  content: {
    paddingTop: 20,
  },
};

class ToggleButton extends React.PureComponent {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  createMarkup = () => ({__html: this.props.hiddenHTML});

  render() {
    const {classes, buttonText} = this.props;
    const {open} = this.state;
    const options = {
      onClick: this.handleClick,
      variant: 'outlined',
      color: 'default',
      size: 'small',
    };
    return (
      <div className={classes.container}>
        <Button {...options}>
          {buttonText}
        </Button>
        <Collapse in={open} mountOnEnter unmountOnExit>
          <div className={classes.content}>
            <div dangerouslySetInnerHTML={this.createMarkup()}/>
          </div>
        </Collapse>
      </div>
    );
  }
}

ToggleButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  hiddenHTML: PropTypes.string.isRequired,
};

export default (withStyles(styles)(ToggleButton));
