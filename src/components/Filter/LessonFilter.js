import React from 'react';
import {useSelector} from 'react-redux';
import {Paper, Typography, List, ListItem, ListItemText, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    background: theme.palette.secondary.main,
  },
  header: {
    padding: theme.spacing(2),
  },
}));

const LessonFilter = () => {
  const classes = useStyles();

  const showPlaylists = useSelector(state => state.showPlaylists);
  const t = useSelector(state => getTranslator(state));
  const filterGroupKeys = useSelector(state => Object.keys(state.filter));

  return (
    <Paper classes={{ root: classes.root }}>
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant='h5'>
              {t('filter.header')}
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider/>
      <RadioButtons/>
      {showPlaylists ? null :
        <React.Fragment>
          <Divider/>
          <List>
            {filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{groupKey}}/>)}
          </List>
        </React.Fragment>
      }
    </Paper>
  );
};

export default LessonFilter;
