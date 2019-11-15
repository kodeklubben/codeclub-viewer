import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {List, ListItem, ListItemText, Collapse, ListItemIcon} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SubjectIcon from '@material-ui/icons/Subject';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
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

    const icons = {
      language: <LanguageIcon color='primary' />,
      topic: <MenuBookIcon color='primary' />,
      subject: <SubjectIcon color='primary' />,
      grade: <HomeWorkIcon color='primary' />,
    };

    return (
      <React.Fragment>
        <ListItem dense button disabled={somethingChecked} onClick={handleClick}>
          {groupKey ? <ListItemIcon>{icons[groupKey]}</ListItemIcon> : null}
          <ListItemText primary={groupName}/>
          {!isCollapsed ? <ExpandLessIcon color='primary'/> : <ExpandMoreIcon color='primary'/>}
        </ListItem>
        <Collapse in={!isCollapsed}>
          <List dense>
            {filterItems}
          </List>
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
