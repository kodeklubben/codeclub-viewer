import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './InstructionButton.scss';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const InstructionButton = ({buttonPath, buttonText, className, bsSize, insideLink}) => {
  const isNotReadme = buttonPath ? buttonPath.includes('README') : false;
  const bsStyle = 'guide';
  const componentClass = insideLink ? 'div' : 'a';
  const ariaLabel = isNotReadme ? 'Teacher instructions' : 'Lesson';
  return (buttonPath ?
    <LinkContainer to={buttonPath}>
      <Button {...{className, bsStyle, bsSize, componentClass}} aria-label={ariaLabel}>
        <Glyphicon className={styles.icon} glyph={isNotReadme ? 'education' : 'pencil'}/>
        <span className={buttonText ? styles.textMargin : ''}>{buttonText}</span>
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

export default withStyles(styles)(InstructionButton);
