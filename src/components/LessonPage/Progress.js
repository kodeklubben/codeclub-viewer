import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Progress.scss';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../selectors/checkboxes';

const Progress = ({checkedCheckboxes, totalCheckboxes, isReadme}) => {
  useStyles(styles);
  if (checkedCheckboxes <= 0 || isReadme) { return null; } 
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

Progress.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => ({
  checkedCheckboxes: getNumberOfCheckedCheckboxes(state, course, lesson, language, isReadme),
  totalCheckboxes: getTotalNumberOfCheckboxes(state, course, lesson, language, isReadme),
});

export default connect(mapStateToProps)(Progress);
