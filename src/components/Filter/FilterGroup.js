import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {setCollapsedFilter} from '../../action_creators';

export const FilterGroup = ({groupKey, availableLessonsForTag, t, filterTags, onFilterCheck,
  setCollapsedFilter, collapsedFilter}) => {
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
        <h4 className={styles.name} onClick={() => setCollapsedFilter(groupKey)}>
          <Glyphicon className={styles.glyph} glyph={collapsedFilter[groupKey] ? 'chevron-down' : 'chevron-right'}/>
          {groupName}
        </h4>
        <Collapse in={collapsedFilter[groupKey]}>
          <div className={styles.filterItems}>{filterItems}</div>
        </Collapse>
      </div>
    );
  }
  else {
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
  collapsedFilter: PropTypes.object,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
  setCollapsedFilter: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  filterTags: state.filter[ownProps.groupKey],
  collapsedFilter: state.collapsedFilter
});

const mapDispatchToProps = {
  onFilterCheck,
  setCollapsedFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
