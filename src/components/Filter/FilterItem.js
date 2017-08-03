import React, {PropTypes} from 'react';
import styles from './FilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const FilterItem = ({tagName, checked, onCheck, numberOfLessons}) => {
  return (
    <div className="checkbox">
      <label className={styles.label}>
        <input type="checkbox"
               checked={checked}
               onChange={onCheck}
        />
        <span className={numberOfLessons ? styles.lessons : styles.noLessons}>{tagName}</span>
      </label>
    </div>
  );
};

FilterItem.propTypes = {
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  numberOfLessons: PropTypes.number.isRequired
};

export default withStyles(styles)(FilterItem);
