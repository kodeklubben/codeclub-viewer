import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {getTranslator} from '../../selectors/translate';
import {setShowPlaylists} from '../../reducers/showPlaylists';
import {resetAllFilters} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const RadioButtons = () => {
  const showPlaylists = useSelector(state => state.showPlaylists);
  const language = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));

  const dispatch = useDispatch();
  const handleChangeToPlaylists = () => {
    dispatch(setShowPlaylists(true));
    dispatch(resetAllFilters('language', language));
    dispatch(collapseAllFilterGroups(true));
  };

  return (
    <List dense component='div'>
      <ListItem button onClick={handleChangeToPlaylists}>
        <ListItemIcon>
          {!showPlaylists ?
            <RadioButtonUncheckedIcon color='primary' fontSize='small'/>
            :
            <RadioButtonCheckedIcon color='primary' fontSize='small'/>
          }
        </ListItemIcon>
        <ListItemText primary={t('filter.radio.playlists')}/>
      </ListItem>
      <ListItem button onClick={() => dispatch(setShowPlaylists(false))}>
        <ListItemIcon>
          {showPlaylists ?
            <RadioButtonUncheckedIcon color='primary' fontSize='small'/>
            :
            <RadioButtonCheckedIcon color='primary' fontSize='small'/>
          }
        </ListItemIcon>
        <ListItemText primary={t('filter.radio.lessons')}/>
      </ListItem>
    </List>
  );
};

export default RadioButtons;
