import React, {PropTypes} from 'react';
import FilterItem from './FilterItem';
import {capitalize} from '../../util';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const FilterGroup = React.createClass({
  render(){
    const groupName = capitalize(this.props.groupName);
    const filterTags = this.props.tagItems;
    const filterItems = Object.keys(filterTags).map((tagItem, idx) => {
      const onCheck = () => this.props.onFilterCheck(groupName, tagItem);
      const availableLessonsForTag = this.props.availableLessons[tagItem];

      if (availableLessonsForTag) {
        return (
          <FilterItem
            key={idx}
            tagItem={tagItem}
            numberOfLessons={availableLessonsForTag}
            checked={filterTags[tagItem]}
            onCheck={onCheck}
          />
        );
      }
    });

    return (
      <div className={styles.filterGroup}>
        <h4>{groupName}</h4>
        {filterItems}
      </div>
    );
  }
});

FilterGroup.propTypes = {
  groupName: PropTypes.string,
  tagItems: PropTypes.object,
  onCheck: PropTypes.func,
  availableLessonsForTag: PropTypes.object
};

export default withStyles(styles)(FilterGroup);
