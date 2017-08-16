import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {resetFilter, collapseAllFilterGroups} from '../../action_creators';

const ClearFilterButton = ({t, language, resetFilter, collapseAllFilterGroups, somethingChecked}) => {
  const onClick = () => {
    resetFilter('language', language);
    collapseAllFilterGroups(true);
  };
  return somethingChecked ?
    <Button block bsStyle="white-grey-lighter" {...{onClick}}>
      {t('filter.removefilter')}
    </Button>
    : null;
};

ClearFilterButton.propTypes = {
  // mapStateToProps
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  resetFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
  somethingChecked: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
  somethingChecked: somethingCheckedInFilter(state)
});

const mapDispatchToProps = {
  resetFilter,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClearFilterButton);
