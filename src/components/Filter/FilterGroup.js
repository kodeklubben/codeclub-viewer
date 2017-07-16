import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';

const FilterGroup = ({groupName, availableLessonsForTag, t, filterTags, translatedGroupName, onFilterCheck}) => {
  if (translatedGroupName) {
    const filterItems = Object.keys(filterTags).map((tagName) => {
      const onCheck = () => onFilterCheck(groupName, tagName);
      const numberOfLessonsForTag = availableLessonsForTag[tagName];
      const translatedTagName = translateTag(t, groupName, tagName);

      return translatedTagName ? (
        <FilterItem
          key={tagName}
          tagName={translatedTagName}
          numberOfLessons={numberOfLessonsForTag}
          checked={filterTags[tagName]}
          onCheck={onCheck}
        />
      ) : null;
    });

    return (
      <div className={styles.filterGroup}>
        <h4>{translatedGroupName}</h4>
        {filterItems}
      </div>
    );
  } else {
    return null;
  }
};

FilterGroup.propTypes = {
  // ownProps:
  groupName: PropTypes.string,
  availableLessonsForTag: PropTypes.object.isRequired,
  t: PropTypes.func,

  // mapStateToProps:
  filterTags: PropTypes.object,
  translatedGroupName: PropTypes.string,
  
  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  filterTags: state.filter[ownProps.groupName],
  translatedGroupName: translateGroup(ownProps.t, ownProps.groupName)
});

const mapDispatchToProps = {
  onFilterCheck
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
