import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Collapse, List, ListItem, ListItemIcon , ListItemText} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Flag from '../Flag';
import {getAvailableLanguages} from '../../utils/filterUtils';
import {setLanguage} from '../../reducers/language';
import {resetOneFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const LanguageList = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const handleSelect = event => {
    dispatch(resetOneFilter('language', event.currentTarget.dataset.key));
    dispatch(setLanguage(event.currentTarget.dataset.key));
    dispatch(collapseAllFilterGroups(true));
    handleOpen();
  };

  const language = useSelector(state => state.language);

  const languages = {
    nb: 'Bokmål',
    en: 'English',
    nn: 'Nynorsk',
    is: 'Íslenska',
  };

  const availableLanguages = getAvailableLanguages().filter(item => item !== language);

  return (
    <React.Fragment>
      <ListItem button divider={open} onClick={handleOpen}>
        <ListItemIcon><Flag {...{language}}/></ListItemIcon>
        <ListItemText primary={languages[language] || language}/>
        {open ? <ExpandLessIcon color='primary'/> : <ExpandMoreIcon color='primary'/>}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List disablePadding>
          {availableLanguages.map(lang =>
            <ListItem key={lang} data-key={lang} button onClick={handleSelect}>
              <ListItemIcon>
                <Flag language={lang}/>
              </ListItemIcon>
              <ListItemText primary={languages[lang] || lang}/>
            </ListItem>
          )}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default LanguageList;
