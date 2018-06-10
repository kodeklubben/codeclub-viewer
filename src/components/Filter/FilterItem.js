import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const FilterItem = ({tagName, checked, onCheck}) => {
  return (
    <div className="checkbox">
      <label htmlFor={tagName} className={styles.label}>
        <input id={tagName} type="checkbox" onChange={onCheck} {...{checked}}/>
        <span>{tagName}</span>
      </label>
    </div>
  );
};

FilterItem.propTypes = {
  // ownProps
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired
};

export default withStyles(styles)(FilterItem);
