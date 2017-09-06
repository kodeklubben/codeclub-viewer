import React, {PropTypes} from 'react';
import styles from './TooltipComponent.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../util';

const TooltipComponent = ({children, tooltipContent}) => {
  const createMarkup = () => {
    return {__html: tooltipContent};
  };
  const animation = true;
  const trigger = 'click';
  const placement = 'bottom';
  const onClick = (e) => e.preventDefault();
  const overlay =
    <Tooltip id={hashCode(tooltipContent)} className={styles.tooltip}>
      <div dangerouslySetInnerHTML={createMarkup()}/>
    </Tooltip>;
  return (
    <OverlayTrigger rootClose {...{animation, placement, trigger, onClick, overlay}}>
      {children}
    </OverlayTrigger>
  );
};

TooltipComponent.propTypes = {
  // ownProps
  children: PropTypes.node,
  tooltipContent: PropTypes.string
};

export default withStyles(styles)(TooltipComponent);
