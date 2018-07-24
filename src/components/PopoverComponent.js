import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './PopoverComponent.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../util';

const PopoverComponent = ({children, popoverContent, showDyslexicFont}) => {
  const createMarkup = () => {
    return {__html: popoverContent};
  };
  const animation = true;
  const trigger = 'click';
  const placement = 'bottom';
  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const className = showDyslexicFont ? styles.dyslexia : styles.content;
  const overlay =
    <Popover id={hashCode(popoverContent)} className={styles.popover}>
      <div {...{className}} dangerouslySetInnerHTML={createMarkup()}/>
    </Popover>;
  return (
    <OverlayTrigger rootClose {...{animation, placement, trigger, onClick, overlay}}>
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
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PopoverComponent));
