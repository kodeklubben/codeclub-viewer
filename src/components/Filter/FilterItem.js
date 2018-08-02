import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import PopoverComponent from '../PopoverComponent';

const FilterItem = ({tagName, checked, onCheck, popoverContent}) => {
  const popover = popoverContent ?
    <PopoverComponent {...{popoverContent}}>
      <span className={styles.tagInfo}><Glyphicon glyph="info-sign"/></span>
    </PopoverComponent>
    : null;
  return (
    <div className="checkbox">
      <label className={styles.label}>
        <input type="checkbox" onChange={onCheck} {...{checked}}/>
        <span>{tagName}</span>
      </label>
      {popover}
    </div>
  );
};

FilterItem.propTypes = {
  // ownProps
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  popoverContent: PropTypes.string.isRequired,
};

export default withStyles(styles)(FilterItem);
