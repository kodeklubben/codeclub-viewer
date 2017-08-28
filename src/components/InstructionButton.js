import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

const InstructionButton = ({buttonPath, buttonText, className, bsSize}) => {
  const bsStyle = 'guide';
  return (buttonPath ?
    <LinkContainer to={buttonPath}>
      <Button componentClass='div' {...{className, bsStyle, bsSize}}>
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
  className: PropTypes.string
};

export default InstructionButton;
