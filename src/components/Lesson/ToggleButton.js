/* eslint-env node */

import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';

const ToggleButton = React.createClass({
  getInitialState() {
    return {
      open: false
    };
  },
  createMarkup(){
    return {
      __html: this.props.hiddenHTML
    };
  },
  render() {
    const containerStyle = {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid black',
      borderRadius: '5px',
      backgroundColor: '#eee'
    };
    const contentStyle = {
      paddingTop: '20px'
    };
    return (
      <div style={containerStyle}>
        <Button onClick={() => this.setState({open: !this.state.open})}>
          {this.props.buttonText}
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <div style={contentStyle}>
              <div dangerouslySetInnerHTML={this.createMarkup()}/>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
});

ToggleButton.propTypes = {
  buttonText: PropTypes.string,
  hiddenHTML: PropTypes.string
};

export default ToggleButton;


