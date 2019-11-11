import React from 'react';
import {useSelector} from 'react-redux';
import {
  Typography, List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, Grid
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    background: theme.palette.secondary.main,
  },
  detailsRoot: {
    padding: 0,
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
    <ExpansionPanel classes={{ root: classes.root }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color='primary'/>}>
        <Grid container justify='space-between'>
          <Typography variant='h5'>
            {t('filter.header')}
          </Typography>
        </Grid>
      </ExpansionPanelSummary>
      <Divider/>
      <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
        <Grid container direction='column'>
          <RadioButtons/>
          {showPlaylists ? null :
            <React.Fragment>
              <Divider/>
              <List>
                {filterGroupKeys.map(groupKey => <FilterGroup key={groupKey} {...{groupKey}}/>)}
              </List>
            </React.Fragment>
          }
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default LessonFilter;
