import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Paper, Typography, List, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import PopoverComponent from '../PopoverComponent';

const useStyles = makeStyles(theme => ({
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
    <Paper>
      <Grid container alignItems='center' justify='space-between'>
        <Typography className={classes.header} variant='h5' component='h3'>
          {t('filter.header')}
        </Typography>
        <PopoverComponent popoverContent={t('filter.tooltip')}/>
      </Grid>
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
