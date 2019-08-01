import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {collapseFilterGroup} from '../../reducers/filterGroupsCollapsed';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {somethingCheckedInGroup} from '../../selectors/filter';
import {getTranslateFilter} from '../../selectors/translate';

const FilterGroup = ({
  groupKey,
  filterTags, filterGroupsCollapsed, somethingChecked, translateFilter,
  collapseFilterGroup
}) => {
  useStyles(styles);
  const handleClick = useCallback(() => {
    const isCollapsed = !somethingChecked && filterGroupsCollapsed[groupKey];
    if (!somethingChecked) {
      collapseFilterGroup(groupKey, !isCollapsed);
    }
  }, [collapseFilterGroup, filterGroupsCollapsed, somethingChecked, groupKey]);

  const groupName = translateFilter(groupKey);
  if (groupName) {
    const filterItems = Object.keys(filterTags).map(key => {
      const tagName = translateFilter(groupKey, key);
      const options = {
        key,
        groupKey,
        tagName,
        itemKey: key,
        checked: filterTags[key],
        popoverContent: translateFilter(groupKey, key, true),
      };
      return tagName ? <FilterItem {...options}/> : null;
    }).filter(item => !!item); // filter out null-values;

    // Sort filterItems alphabetically except grades
    if (groupKey !== 'grade') {
      filterItems.sort((a, b) => a.props.tagName.localeCompare(b.props.tagName));
    }

    const isCollapsed = !somethingChecked && filterGroupsCollapsed[groupKey];
    const headingStyle = styles.name + (somethingChecked ? ' ' + styles.somethingChecked : '');

    return (
      <ListGroupItem>
        <div
          className={headingStyle}
          onClick={handleClick}
          role='button'
          tabIndex='0'
          onKeyPress={handleClick}
        >
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
  collapseFilterGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {groupKey}) => ({
  filterTags: state.filter[groupKey],
  filterGroupsCollapsed: state.filterGroupsCollapsed,
  somethingChecked: somethingCheckedInGroup(state, groupKey),
  translateFilter: getTranslateFilter(state),
});

const mapDispatchToProps = {
  collapseFilterGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterGroup);
