import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Progress.scss';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

const Progress = ({checkedCheckboxes, totalCheckboxes}) => {
  const now = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  const active = checkedCheckboxes < totalCheckboxes;
  const bsStyle = active ? 'danger' : 'success';
  const className = styles.progressBar;
  const checkboxesLabel =`✓ ${checkedCheckboxes}/${totalCheckboxes}`;
  const label = active ?
    <span className={styles.label}>{checkboxesLabel}</span> :
    <span className={styles.label}>{checkboxesLabel} ★</span>;
  return <ProgressBar {...{now, bsStyle, className, label, active}}/>;
};

Progress.PropTypes = {
  // ownProps
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
};

export default withStyles(styles)(Progress);
