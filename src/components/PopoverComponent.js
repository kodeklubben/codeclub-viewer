import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import renderHTML from 'react-render-html';
import styles from './PopoverComponent.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../utils/util';

const PopoverComponent = ({children, popoverContent, showDyslexicFont}) => {
  const className = showDyslexicFont ? styles.contentDyslexia : styles.content;
  const overlay =
    <Popover id={hashCode(popoverContent)} className={styles.popover}>
      <div {...{className}} role='region'>
        {renderHTML(popoverContent)}
      </div>
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

  // mapStateToProps
  showDyslexicFont: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PopoverComponent));
