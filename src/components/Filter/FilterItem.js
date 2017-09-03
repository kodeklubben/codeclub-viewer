import React, {PropTypes} from 'react';
import styles from './FilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const FilterItem = ({tagName, checked, onCheck, numberOfLessons, numberOfTagsForCourse}) => {
  const numberOfLessonsAndExternalCourses = numberOfLessons + numberOfTagsForCourse;
  return (
    <div className="checkbox">
      <label className={styles.label}>
        <input type="checkbox" onChange={onCheck} {...{checked}}/>
        <span className={numberOfLessonsAndExternalCourses ? styles.lessons : styles.noLessons}>
          {tagName}
        </span>
      </label>
    </div>
  );
};

FilterItem.propTypes = {
  // ownProps
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  numberOfLessons: PropTypes.number.isRequired,
  numberOfTagsForCourse: PropTypes.number.isRequired
};

export default withStyles(styles)(FilterItem);
