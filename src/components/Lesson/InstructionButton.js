import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './InstructionButton.scss';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

const InstructionButton = ({buttonPath, buttonText, bsStyle, bsSize}) => {
  return (buttonPath ?
    <LinkContainer to={buttonPath}>
      <Button className={styles.instructionButton} bsStyle={bsStyle} bsSize={bsSize}>
        {buttonText}
      </Button>
    </LinkContainer> :
    null);
};

InstructionButton.propTypes = {
  // ownProps
  buttonPath: PropTypes.string,
  buttonText: PropTypes.string,
  bsStyle: PropTypes.string,
  bsSize: PropTypes.string
};

export default (withStyles(styles)(InstructionButton));
