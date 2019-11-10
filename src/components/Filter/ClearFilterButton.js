import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ClearFilterButton = () => {
  const classes = useStyles();

  const language = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));
  const somethingChecked = useSelector(state => somethingCheckedInFilter(state));

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetAllFilters('language', language));
    dispatch(collapseAllFilterGroups(true));
  };

  return somethingChecked ?
    <Button
      className={classes.button}
      variant='outlined'
      onClick={handleClick}
      startIcon={<DeleteIcon/>}
    >
      {t('filter.removefilter')}
    </Button>
    : null;
};

export default ClearFilterButton;
