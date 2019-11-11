import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {ListItem, ListItemText, Collapse} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getTranslateFilter} from '../../selectors/translate';
import {somethingCheckedInGroup} from '../../selectors/filter';
import {collapseFilterGroup} from '../../reducers/filterGroupsCollapsed';
import FilterItem from './FilterItem';

const FilterGroup = ({groupKey}) => {
  const translateFilter = useSelector(state => getTranslateFilter(state));
  const filterTags = useSelector(state => state.filter[groupKey]);
  const filterGroupsCollapsed = useSelector(state => state.filterGroupsCollapsed);
  const somethingChecked = useSelector(state => somethingCheckedInGroup(state, groupKey));

  const dispatch = useDispatch();
  const handleClick = () => {
    const isCollapsed = !somethingChecked && filterGroupsCollapsed[groupKey];
    if (!somethingChecked) {
      dispatch(collapseFilterGroup(groupKey, !isCollapsed));
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

    return (
      <React.Fragment>
        <ListItem dense button disabled={somethingChecked} onClick={handleClick}>
          <ListItemText primary={groupName}/>
          {!isCollapsed ? <ExpandLessIcon color='primary'/> : <ExpandMoreIcon color='primary'/>}
        </ListItem>
        <Collapse in={!isCollapsed}>
          {filterItems}
        </Collapse>
      </React.Fragment>
    );
  }
    
  else {
    return null;
  }
};

FilterGroup.propTypes = {
  groupKey: PropTypes.string,
};

export default FilterGroup;
