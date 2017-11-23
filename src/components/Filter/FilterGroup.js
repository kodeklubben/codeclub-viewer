import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onFilterCheck, collapseFilterGroup} from '../../action_creators';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {translateGroup, translateTag} from '../../util';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {somethingCheckedInGroup} from '../../selectors/filter';

const FilterGroup = ({groupKey, t, filterTags, onFilterCheck,
  collapseFilterGroup, filterGroupsCollapsed, somethingChecked}) => {
  const groupName = translateGroup(t, groupKey);
  if (groupName) {
    const filterItems = Object.keys(filterTags).map(key => {
      const onCheck = () => onFilterCheck(groupKey, key);
      const tagName = translateTag(t, groupKey, key);
      const checked = filterTags[key];
      return tagName ? <FilterItem {...{key, checked, tagName, onCheck}}/>
        : null;
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
  t: PropTypes.func.isRequired,

  // mapStateToProps:
  filterTags: PropTypes.object.isRequired,
  filterGroupsCollapsed: PropTypes.object.isRequired,
  somethingChecked: PropTypes.bool.isRequired,

  // mapDispatchToProps:
  onFilterCheck: PropTypes.func.isRequired,
  collapseFilterGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {groupKey}) => ({
  filterTags: state.filter[groupKey],
  filterGroupsCollapsed: state.filterGroupsCollapsed,
  somethingChecked: somethingCheckedInGroup(state, groupKey),
});

const mapDispatchToProps = {
  onFilterCheck,
  collapseFilterGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
