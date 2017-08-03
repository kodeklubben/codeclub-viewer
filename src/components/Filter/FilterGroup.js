import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {collapseFilterGroup} from '../../action_creators';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {somethingCheckedInGroup} from '../../selectors/filter';

export const FilterGroup = ({
  groupKey, availableLessonsForTag, t, filterTags, onFilterCheck,
  collapseFilterGroup, filterGroupsCollapsed, somethingChecked
}) => {
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

    const nothingChecked = !somethingChecked;
    const isCollapsed = nothingChecked && filterGroupsCollapsed[groupKey];
    const headingStyle = styles.name + (somethingChecked ? ' ' + styles.somethingChecked : '');
    const onGroupClick = () => {
      if (nothingChecked) {
        collapseFilterGroup(groupKey, !isCollapsed);
      }
    };
    return (
      <ListGroupItem>
        <div className={headingStyle} onClick={onGroupClick}>
          <Glyphicon className={styles.glyph} glyph={isCollapsed ? 'chevron-right' : 'chevron-down'}/>
          {groupName}
        </div>
        <Collapse in={!isCollapsed}>
          <div>{filterItems}</div>
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
  t: PropTypes.func.isRequired,

  // mapStateToProps:
  filterTags: PropTypes.object,
  filterGroupsCollapsed: PropTypes.object,
  somethingChecked: PropTypes.bool.isRequired,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
  collapseFilterGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  filterTags: state.filter[ownProps.groupKey],
  filterGroupsCollapsed: state.filterGroupsCollapsed,
  somethingChecked: somethingCheckedInGroup(state, ownProps.groupKey),
});

const mapDispatchToProps = {
  onFilterCheck,
  collapseFilterGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
