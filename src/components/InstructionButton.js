import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './InstructionButton.scss';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../selectors/translate';

const InstructionButton = ({path, isReadme, onlyIcon, insideLink, buttonText}) => {
  const buttonArgs = {
    className: onlyIcon ? styles.buttonOnlyIcon : styles.button,
    bsStyle: 'guide',
    bsSize: onlyIcon ? 'xs' : 'small',
    componentClass: insideLink ? 'div' : 'a',
  };
  return (path ?
    <LinkContainer to={path}>
      <Button  {...buttonArgs} aria-label={buttonText}>
        <Glyphicon className={styles.icon} glyph={isReadme ? 'education' : 'pencil'}/>
        <span className={onlyIcon ? '' : styles.textMargin}>{buttonText}</span>
      </Button>
    </LinkContainer> :
    null);
};

InstructionButton.propTypes = {
  // ownProps
  path: PropTypes.string,
  isReadme: PropTypes.string.isRequired,
  onlyIcon: PropTypes.bool,
  insideLink: PropTypes.bool, // set to true if button is nested inside a <a>...</a>

  // mapStateToProps
  buttonText: PropTypes.string,
};

const mapStateToProps = (state, {isReadme}) => {
  const t = getTranslator(state);
  return {
    buttonText: t(isReadme ? 'lessons.toteacherinstruction' : 'lessons.tolesson'),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(InstructionButton));
