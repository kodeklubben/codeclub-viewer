import React, {PropTypes} from 'react';
import {capitalize} from '../../util';
import styles from './FilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const FilterItem = React.createClass({
  render(){
    const tagItem = capitalize(this.props.tagItem);
    const numberOfLessons = this.props.numberOfLessons;
    const totalNumberOfLessons = this.props.totalAvailableLessons;
    return (
      <div className="checkbox">
        <label className={styles.label}>
          <input type="checkbox"
                 checked={this.props.checked}
                 onChange={this.props.onCheck}
          />
          {tagItem} <span className={styles.numbers}> ({numberOfLessons}/{totalNumberOfLessons}) </span>
        </label>
      </div>
    );
  }
});

FilterItem.propTypes = {
  tagItem: PropTypes.string,
  checked: PropTypes.bool,
  onCheck: PropTypes.func,
  numberOfLessons: PropTypes.number
};

export default withStyles(styles)(FilterItem);
