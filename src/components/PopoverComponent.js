import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopoverComponent.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../util';

const PopoverComponent = ({children, popoverContent}) => {
  const createMarkup = () => {
    return {__html: popoverContent};
  };
  const animation = true;
  const trigger = 'click';
  const placement = 'bottom';
  const onClick = (e) => e.preventDefault();
  const overlay =
    <Popover id={hashCode(popoverContent)} className={styles.popover}>
      <div className={styles.content} dangerouslySetInnerHTML={createMarkup()}/>
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
};

export default withStyles(styles)(PopoverComponent);
