import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {resetFilter, collapseAllFilterGroups} from '../../action_creators';

const ClearFilterButton = ({t, language, resetFilter, collapseAllFilterGroups}) => {
  const onClick = () => {
    resetFilter('language', language);
    collapseAllFilterGroups(true);
  };
  return (
    <Button block bsStyle="white-grey-lighter" {...{onClick}}>
      {t('filter.removefilter')}
    </Button>
  );
};

ClearFilterButton.propTypes = {
  // mapStateToProps
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  resetFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
});

const mapDispatchToProps = {
  resetFilter,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClearFilterButton);
