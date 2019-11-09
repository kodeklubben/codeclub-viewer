import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {filterChecked} from '../../reducers/filter';
import Flag from '../Flag';
import PopoverComponent from '../PopoverComponent';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
}));

const FilterItem = ({itemKey, groupKey, tagName, checked, popoverContent}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleChange = () => dispatch(filterChecked(groupKey, itemKey));

  const popover = popoverContent ? <PopoverComponent {...{popoverContent}} size='small'/> : null;

  return (
    <div className={classes.listItem}>
      <ListItem dense button onClick={handleChange}>
        <ListItemIcon>
          {checked ? <CheckBoxIcon fontSize='small'/> : <CheckBoxOutlineBlankIcon fontSize='small'/>}
        </ListItemIcon>
        <ListItemText id={itemKey} primary={tagName}/>
        {groupKey === 'language' ? <Flag language={itemKey}/> : null}
      </ListItem>
      {popover}
    </div>
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
