import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ClearFilterButton.scss';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

const ClearFilterButton = () => {
  useStyles(styles);

  const {language, t, somethingChecked} = useSelector(state => ({
    language: state.language,
    t: getTranslator(state),
    somethingChecked: somethingCheckedInFilter(state),
  }));

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetAllFilters('language', language));
    dispatch(collapseAllFilterGroups(true));
  };

  return somethingChecked ?
    <Button block onClick={handleClick} className={styles.marginBottom} bsStyle={'white-grey-lighter'}>
      {t('filter.removefilter')}
    </Button>
    : null;
};

export default ClearFilterButton;
