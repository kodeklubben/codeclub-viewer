import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Paper, Typography, List, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 300,
    overflowX: 'hidden',
  },
  header: {
    padding: 15,
  },
}));

const LessonFilter = () => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));
  const filterGroupKeys = useSelector(state => Object.keys(state.filter));

  return (
    <Grid container justify='center'>
      <Paper className={classes.paper}>
        <Typography className={classes.header} variant='h5' component='h3'>
          {t('filter.header')}
        </Typography>
        <Divider/>
        <List>
          {filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{groupKey}}/>)}
        </List>
      </Paper>
    </Grid>
  );
};

export default LessonFilter;
