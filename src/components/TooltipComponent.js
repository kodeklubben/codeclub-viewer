import React from 'react';
import PropTypes from 'prop-types';
import styles from './TooltipComponent.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../util';

const TooltipComponent = ({children, tooltipContent}) => {
  const createMarkup = () => {
    return {__html: tooltipContent};
  };
  const tooltip =
    <Tooltip className={styles.tooltip} id={hashCode(tooltipContent)}>
      <div dangerouslySetInnerHTML={createMarkup()}/>
    </Tooltip>;
  return tooltipContent ?
    <OverlayTrigger animation={true} delayShow={400} placement="bottom" overlay={tooltip}>
      {children}
    </OverlayTrigger>
    :
    <div>
      {children}
    </div>;
};

TooltipComponent.propTypes = {
  // ownProps
  children: PropTypes.node,
  tooltipContent: PropTypes.string
};

export default withStyles(styles)(TooltipComponent);
