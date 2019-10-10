import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, connect} from 'react-redux';
import {collapseFilterGroup} from '../../reducers/filterGroupsCollapsed';
import FilterItem from './FilterItem';
import styles from './FilterGroup.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {somethingCheckedInGroup} from '../../selectors/filter';
import {getTranslateFilter} from '../../selectors/translate';

const FilterGroup = ({groupKey, collapseFilterGroup}) => {
  useStyles(styles);

  const {filterTags, filterGroupsCollapsed, somethingChecked, translateFilter} = useSelector(state => ({
    filterTags: state.filter[groupKey],
    filterGroupsCollapsed: state.filterGroupsCollapsed,
    somethingChecked: somethingCheckedInGroup(state, groupKey),
    translateFilter: getTranslateFilter(state),
  }));

  const handleClick = () => {
    const isCollapsed = !somethingChecked && filterGroupsCollapsed[groupKey];
    if (!somethingChecked) {
      collapseFilterGroup(groupKey, !isCollapsed);
    }
  };

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
  groupKey: PropTypes.string,
};

const mapDispatchToProps = {
  collapseFilterGroup,
};

export default connect(null, mapDispatchToProps)(FilterGroup);
