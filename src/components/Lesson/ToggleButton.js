/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  createMarkup = () => ({__html: this.props.hiddenHTML})

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
}

ToggleButton.propTypes = {
  // ownProps
  buttonText: PropTypes.string,
  hiddenHTML: PropTypes.string
};

export default ToggleButton;
