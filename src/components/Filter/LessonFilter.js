import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import ClearFilterButton from './ClearFilterButton';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 300,
  },
  paper: {
    flexGrow: 1,
    background: theme.palette.secondary.main,
  },
  paperMargin: {
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
    <div className={classes.container}>
      <Paper classes={showPlaylists || course == null ? { root: classes.paper } : { root: classes.paperMargin }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <FilterListIcon color='primary'/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant='h5' component='h1'>
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
            <List component='div'>
              {filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{groupKey}}/>)}
            </List>
          </React.Fragment>
        }
      </Paper>
      <ClearFilterButton/>
    </div>
  );
};

LessonFilter.propTypes = {
  course: PropTypes.string,
};

export default LessonFilter;
