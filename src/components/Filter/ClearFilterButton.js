import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ClearFilterButton.scss';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

const ClearFilterButton = ({t, language, resetAllFilters, collapseAllFilterGroups, somethingChecked}) => {
  const onClick = () => {
    resetAllFilters('language', language);
    collapseAllFilterGroups(true);
  };
  const bsStyle = 'white-grey-lighter';
  const className = styles.marginBottom;
  return somethingChecked ?
    <Button block {...{className, bsStyle, onClick}}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClearFilterButton));
