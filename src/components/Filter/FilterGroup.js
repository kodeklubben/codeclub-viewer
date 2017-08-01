import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {showFilterGroups} from '../../action_creators';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

export const FilterGroup = ({groupKey, availableLessonsForTag, t, filterTags, onFilterCheck,
  showFilterGroups, filterGroupsCollapse, language}) => {
  const groupName = translateGroup(t, groupKey);
  let filterItemsNumber = 0;
  if (groupName) {
    const filterItems = Object.keys(filterTags).map((tagKey) => {
      const onCheck = () => onFilterCheck(groupKey, tagKey);
      const numberOfLessonsForTag = availableLessonsForTag[tagKey];
      const tagName = translateTag(t, groupKey, tagKey);
      if (filterTags[tagKey]) {
        filterItemsNumber++;
      }
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
    const hasCheckedFilterGroup = (filterItemsNumber, filterTags, language) => {
      if (filterItemsNumber === 0) {
        return true;
      }
      else if (filterTags[language] && filterItemsNumber === 1) {
        return true;
      }
      return false;
    };
    return (
      <ListGroupItem>
        <div className={styles.name} onClick={() =>
          hasCheckedFilterGroup(filterItemsNumber, filterTags, language) ?
          showFilterGroups(groupKey, !filterGroupsCollapse[groupKey]) : null}>
          <Glyphicon className={styles.glyph}
            glyph={filterGroupsCollapse[groupKey] ? 'chevron-down' : 'chevron-right'}/>
          {groupName}
        </div>
        <Collapse in={filterGroupsCollapse[groupKey]}>
          <div className={styles.filterItems}>{filterItems}</div>
        </Collapse>
      </ListGroupItem>
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
  filterGroupsCollapse: PropTypes.object,
  language: PropTypes.string,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
  showFilterGroups: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  filterTags: state.filter[ownProps.groupKey],
  filterGroupsCollapse: state.filterGroupsCollapse,
  language: state.language
});

const mapDispatchToProps = {
  onFilterCheck,
  showFilterGroups
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
