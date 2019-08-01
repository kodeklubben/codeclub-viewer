import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ClearFilterButton.scss';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

const ClearFilterButton = ({t, language, somethingChecked, resetAllFilters, collapseAllFilterGroups}) => {
  useStyles(styles);
  const handleClick = useCallback(() => {
    resetAllFilters('language', language);
    collapseAllFilterGroups(true);
  }, [resetAllFilters, language, collapseAllFilterGroups]);

  return somethingChecked ?
    <Button block onClick={handleClick} className={styles.marginBottom} bsStyle={'white-grey-lighter'}>
      {t('filter.removefilter')}
    </Button>
    : null;
};

ClearFilterButton.propTypes = {
  // mapStateToProps
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  resetAllFilters: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
  somethingChecked: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
  somethingChecked: somethingCheckedInFilter(state)
});

const mapDispatchToProps = {
  resetAllFilters,
  collapseAllFilterGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClearFilterButton);
