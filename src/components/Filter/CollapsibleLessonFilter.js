import React from 'react';
import {useSelector} from 'react-redux';
import {
  List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, Grid, Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import {getTranslator} from '../../selectors/translate';
import FilterGroup from './FilterGroup';
import RadioButtons from './RadioButtons';
import ClearFilterButton from './ClearFilterButton';

const useStyles = makeStyles(theme => ({
  panel: {
    flexGrow: 1,
    background: theme.palette.secondary.main,
  },
  panelSummary: {
    paddingLeft: theme.spacing(2),
  },
  panelDetails: {
    padding: 0,
  },
  header: {
    marginLeft: theme.spacing(4),
  },
}));

const LessonFilter = () => {
  const classes = useStyles();

  const showPlaylists = useSelector(state => state.showPlaylists);
  const t = useSelector(state => getTranslator(state));
  const filterGroupKeys = useSelector(state => Object.keys(state.filter));

  return (
    <React.Fragment>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} classes={{ root: classes.panel }}>
        <ExpansionPanelSummary classes={{ root: classes.panelSummary }} expandIcon={<ExpandMoreIcon color='primary'/>}>
          <FilterListIcon color='primary' />
          <Typography className={classes.header} variant='h5'>
            {t('filter.header')}
          </Typography>
        </ExpansionPanelSummary>
        <Divider/>
        <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
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
      <ClearFilterButton/>
    </React.Fragment>
  );
};

export default LessonFilter;
