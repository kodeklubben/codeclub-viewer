import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopoverComponent.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../utils/util';

const PopoverComponent = ({children, popoverContent}) => {
  const createMarkup = () => {
    return {__html: popoverContent};
  };
  const overlay =
    <Popover id={hashCode(popoverContent)} className={styles.popover}>
      <div className={styles.content} dangerouslySetInnerHTML={createMarkup()}/>
    </Popover>;
  const options = {
    animation: true,
    rootClose: true,
    trigger: 'click',
    placement: 'bottom',
    onClick: e => {
      e.stopPropagation();
      e.preventDefault();
    },
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
};

export default withStyles(styles)(PopoverComponent);
