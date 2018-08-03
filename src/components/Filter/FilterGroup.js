import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filterChecked} from '../../reducers/filter';
import {collapseFilterGroup} from '../../reducers/filterGroupsCollapsed';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {somethingCheckedInGroup} from '../../selectors/filter';
import {getTranslateFilter} from '../../selectors/translate';

const FilterGroup = ({
  groupKey, filterTags, filterChecked,
  collapseFilterGroup, filterGroupsCollapsed, somethingChecked, translateFilter
}) => {
  const groupName = translateFilter(groupKey);
  if (groupName) {
    const filterItems = Object.keys(filterTags).map(key => {
      const onCheck = () => filterChecked(groupKey, key);
      const tagName = translateFilter(groupKey, key);
      const popoverContent = translateFilter(groupKey, key, true);

      const checked = filterTags[key];
      return tagName ? <FilterItem {...{key, checked, tagName, onCheck, popoverContent}}/>
        : null;
    }).filter(item => !!item); // filter out null-values;

    // Sort filterItems alphabetically except grades
    if (groupKey !== 'grade') {
      filterItems.sort((a, b) => a.props.tagName.localeCompare(b.props.tagName));
    }

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
        <div className={headingStyle} onClick={onGroupClick} role='button' tabIndex='0' onKeyPress={onGroupClick}>
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

  // mapStateToProps:
  filterTags: PropTypes.object.isRequired,
  filterGroupsCollapsed: PropTypes.object.isRequired,
  somethingChecked: PropTypes.bool.isRequired,
  translateFilter: PropTypes.func.isRequired,

  // mapDispatchToProps:
  filterChecked: PropTypes.func.isRequired,
  collapseFilterGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {groupKey}) => ({
  filterTags: state.filter[groupKey],
  filterGroupsCollapsed: state.filterGroupsCollapsed,
  somethingChecked: somethingCheckedInGroup(state, groupKey),
  translateFilter: getTranslateFilter(state),
});

const mapDispatchToProps = {
  filterChecked,
  collapseFilterGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterGroup));
