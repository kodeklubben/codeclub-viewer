import React from 'react';
import {useSelector, connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ClearFilterButton.scss';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

const ClearFilterButton = ({resetAllFilters, collapseAllFilterGroups}) => {
  useStyles(styles);

  const {language, t, somethingChecked} = useSelector(state => ({
    language: state.language,
    t: getTranslator(state),
    somethingChecked: somethingCheckedInFilter(state),
  }));

  const handleClick = () => {
    resetAllFilters('language', language);
    collapseAllFilterGroups(true);
  };

  return somethingChecked ?
    <Button block onClick={handleClick} className={styles.marginBottom} bsStyle={'white-grey-lighter'}>
      {t('filter.removefilter')}
    </Button>
    : null;
};

const mapDispatchToProps = {
  resetAllFilters,
  collapseAllFilterGroups,
};

export default connect(null, mapDispatchToProps)(ClearFilterButton);
