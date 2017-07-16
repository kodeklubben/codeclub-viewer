import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';

const FilterGroup = ({groupKey, availableLessonsForTag, t, filterTags, onFilterCheck}) => {
  const groupName = translateGroup(t, groupKey);

  if (groupName) {
    const filterItems = Object.keys(filterTags).map((tagKey) => {
      const onCheck = () => onFilterCheck(groupKey, tagKey);
      const numberOfLessonsForTag = availableLessonsForTag[tagKey];
      const tagName = translateTag(t, groupKey, tagKey);

      return tagName ? (
        <FilterItem
          key={tagKey}
          tagName={tagName}
          numberOfLessons={numberOfLessonsForTag}
          checked={filterTags[tagKey]}
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
  } else {
    return null;
  }
};

FilterGroup.propTypes = {
  // ownProps:
  groupKey: PropTypes.string,
  availableLessonsForTag: PropTypes.object.isRequired,
  t: PropTypes.func,

  // mapStateToProps:
  filterTags: PropTypes.object,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  filterTags: state.filter[ownProps.groupKey],
});

const mapDispatchToProps = {
  onFilterCheck
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
