import React, {PropTypes} from 'react';
import FilterItem from './FilterItem';
import {capitalize} from '../../util';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getLanguageName} from '../../util';

const translateGroupName = (groupName, t) => {
  return groupName === 'language' ? t('filter.language') : groupName;
};

const FilterGroup = React.createClass({
  render(){
    const groupName = capitalize(translateGroupName(this.props.groupName, this.props.t));
    const filterTags = this.props.tagItems;
    const filterItems = Object.keys(filterTags).map((tagItem) => {
      const onCheck = () => this.props.onFilterCheck(this.props.groupName, tagItem);
      const availableLessonsForTag = this.props.availableLessonsForTag[tagItem];
      const tagName = this.props.groupName === 'language' ? getLanguageName(tagItem) : tagItem;

      return tagName ? (
        <FilterItem
          key={tagItem}
          tagItem={tagName}
          numberOfLessons={availableLessonsForTag}
          checked={filterTags[tagItem]}
          onCheck={onCheck}
        />
      ) : null;
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
  availableLessonsForTag: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default withStyles(styles)(FilterGroup);
