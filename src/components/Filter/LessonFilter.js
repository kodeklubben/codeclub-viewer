import React from 'react';
import PropTypes from 'prop-types';
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
  rootMargin: {
    width: '100%',
    background: theme.palette.secondary.main,
    marginTop: theme.spacing(8),
  },
  header: {
    padding: theme.spacing(2),
  },
}));

const LessonFilter = ({course}) => {
  const classes = useStyles();

  const showPlaylists = useSelector(state => state.showPlaylists);
  const t = useSelector(state => getTranslator(state));
  const filterGroupKeys = useSelector(state => Object.keys(state.filter));

  return (
    <Paper classes={showPlaylists || course == null ? { root: classes.root } : { root: classes.rootMargin }}>
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

LessonFilter.propTypes = {
  course: PropTypes.string,
};

export default LessonFilter;
