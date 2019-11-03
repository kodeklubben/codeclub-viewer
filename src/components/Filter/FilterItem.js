import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {filterChecked} from '../../reducers/filter';

const FilterItem = ({itemKey, groupKey, tagName, checked}) => {
  const dispatch = useDispatch();
  const handleChange = () => dispatch(filterChecked(groupKey, itemKey));

  return (
    <ListItem dense button onClick={handleChange}>
      <ListItemIcon>
        {checked ? <CheckBoxIcon fontSize='small'/> : <CheckBoxOutlineBlankIcon fontSize='small'/>}
      </ListItemIcon>
      <ListItemText id={itemKey} primary={tagName}/>
    </ListItem>
  );
};

FilterItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  groupKey: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default FilterItem;
