import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './PopoverComponent.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../utils/util';

const PopoverComponent = ({children, popoverContent, showDyslexicFont, showDarkMode}) => {
  useStyles(styles);
  const handleClick = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const className = showDyslexicFont ? styles.contentDyslexia : styles.content;
  const overlay =
    <Popover id={hashCode(popoverContent)} className={showDarkMode ? styles.popoverDark : styles.popoverWhite}>
      <div {...{className}} role='region' dangerouslySetInnerHTML={{__html: popoverContent}}/>
    </Popover>;
  const options = {
    animation: true,
    rootClose: true,
    trigger: 'click',
    placement: 'bottom',
    onClick: handleClick,
    overlay,
  };
  return (
    <OverlayTrigger {...options}>
      {children}
    </OverlayTrigger>
  );
};

PopoverComponent.propTypes = {
  // ownProps
  children: PropTypes.node,
  popoverContent: PropTypes.string,

  // mapStateToProps
  showDyslexicFont: PropTypes.bool.isRequired,
  showDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
  showDarkMode: state.showDarkMode,
});

export default connect(mapStateToProps)(PopoverComponent);
