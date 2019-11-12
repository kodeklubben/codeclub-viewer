import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {filterChecked} from '../../reducers/filter';
import Flag from '../Flag';
import PopoverComponent from '../PopoverComponent';
import {makeStyles} from  '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 0,
  },
}));

const FilterItem = ({itemKey, groupKey, tagName, checked, popoverContent}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleChange = () => dispatch(filterChecked(groupKey, itemKey));

  return (
    <ListItem button onClick={handleChange}>
      <ListItemIcon>
        {checked ?
          <CheckBoxIcon color='primary' fontSize='small'/>
          :
          <CheckBoxOutlineBlankIcon color='primary' fontSize='small'/>
        }
      </ListItemIcon>
      <ListItemText id={itemKey} primary={tagName}/>
      {groupKey === 'language' ?
        <ListItemIcon classes={{ root: classes.root }}>
          <Flag language={itemKey}/>
        </ListItemIcon>
        : null}
      {popoverContent ?
        <ListItemSecondaryAction>
          <PopoverComponent {...{popoverContent}}/>
        </ListItemSecondaryAction>
        : null}
    </ListItem>
  );
};

FilterItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  groupKey: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  popoverContent: PropTypes.string,
};

export default FilterItem;
