import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

const InstructionButton = ({buttonPath, buttonText, className, bsSize, insideLink}) => {
  const bsStyle = 'guide';
  const componentClass = insideLink ? 'div' : 'a';
  return (buttonPath ?
    <LinkContainer to={buttonPath}>
      <Button {...{className, bsStyle, bsSize, componentClass}}>
        {buttonText}
      </Button>
    </LinkContainer> :
    null);
};

InstructionButton.propTypes = {
  // ownProps
  buttonPath: PropTypes.string,
  buttonText: PropTypes.string,
  bsSize: PropTypes.string,
  className: PropTypes.string,
  insideLink: PropTypes.bool, // set to true if button is nested inside a <a>...</a>
};

export default InstructionButton;
